import type { CheckoutCallback, PaymentOption } from '@d3-inc/marketplace-widget';
import { mintManagerAbi } from '@d3-inc/marketplace-widget';
import { useState } from 'react';
import type { BaseError, TransactionReceipt } from 'viem';
import { erc20Abi, zeroAddress } from 'viem';
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';

type HandleCryptoCheckoutProps = {
  handleOnSuccess: (receipt: TransactionReceipt | undefined) => void;
  handleOnError: (error: BaseError | string) => void;
  transactionVoucher: CheckoutCallback;
};

export const useCryptoCheckout = () => {
  const { address: evmWalletAddress, chain } = useAccount();
  const { switchChainAsync, chains } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [isEvmNetworkUpdated, setIsEvmNetworkUpdated] = useState(false);

  async function handleCryptoCheckout({
    transactionVoucher,
    handleOnError,
    handleOnSuccess,
  }: HandleCryptoCheckoutProps) {
    try {
      const { voucher, signature, selectedPaymentToken } = transactionVoucher || {};
      const isConnectedOnCorrectChain = await ensureWalletConnectedOnCorrectChain({
        ...transactionVoucher.selectedPaymentToken,
      });
      if (!isConnectedOnCorrectChain) {
        return;
      }
      await executePaymentTransactions(
        voucher as CheckoutCallback['voucher'],
        signature,
        Number(selectedPaymentToken.chainId),
        selectedPaymentToken,
        handleOnSuccess,
      );
    } catch (error: unknown) {
      console.error(error);
      const errorMessage: string = (error as BaseError)?.shortMessage ?? 'Something went wrong';
      handleOnError(errorMessage);
    }
  }

  async function ensureWalletConnectedOnCorrectChain(
    paymentToken: PaymentOption,
  ): Promise<boolean> {
    // If wallet is disconnected from the wallet or the wallet-connect session is expired
    // and the payment modal is open we can close the popup after showing the error
    if (!evmWalletAddress) {
      return false;
    }

    const paymentChainId = Number(paymentToken.chainId);
    const isCorrectChain = await ensureCorrectEVMChain(paymentChainId);
    if (!isCorrectChain) {
      return false;
    }

    return true;
  }

  async function ensureCorrectChainId(selectedPaymentToken: PaymentOption) {
    const currentChainId = await walletClient?.getChainId();
    if (currentChainId?.toString() !== selectedPaymentToken?.chainId?.toString()) {
      throw new Error('Chain switched during payment process, aborting transaction');
    }
  }

  async function executePaymentTransactions(
    voucher: CheckoutCallback['voucher'],
    signature: string,
    paymentChainId: number,
    selectedPaymentToken: PaymentOption,
    handleOnSuccess: (receipt: TransactionReceipt | undefined) => void,
  ) {
    const targetChain = chains.find((chain) => chain.id === paymentChainId);
    const isERC20Used = voucher.token !== undefined && voucher.token !== zeroAddress;

    if (isERC20Used) {
      const approvalHash = await walletClient?.writeContract({
        address: voucher.token as `0x${string}`,
        abi: erc20Abi,
        functionName: 'approve',
        account: evmWalletAddress as `0x${string}`,
        chain: targetChain,
        args: [selectedPaymentToken?.contractAddress as `0x${string}`, BigInt(voucher.amount)],
      });
      await publicClient?.waitForTransactionReceipt({
        hash: approvalHash as `0x${string}`,
      });
    }

    const namesArgs = voucher.names?.map((name) => [
      name.registry,
      name.label,
      name.tld,
      name.expirationTime,
      name.owner,
      name.renewal,
    ]);
    const voucherArgs = [
      voucher.buyer,
      voucher.token,
      voucher.amount,
      voucher.voucherExpiration,
      voucher.paymentId,
      voucher.orderId,
      namesArgs,
    ];

    const simulateRequest = await publicClient?.simulateContract({
      chain: targetChain,
      address: selectedPaymentToken?.contractAddress as `0x${string}`,
      abi: mintManagerAbi,
      functionName: 'pay',
      // Explicit wallet address is important to make sure that the transaction is signed by the correct wallet
      account: evmWalletAddress as `0x${string}`,
      args: [voucherArgs, signature],
      value: !isERC20Used ? BigInt(voucher.amount ?? 0) : undefined,
    });
    await ensureCorrectChainId(selectedPaymentToken);
    const transactionHash = await walletClient?.writeContract(simulateRequest!.request);
    if (transactionHash) {
      await handleEvmTransactionConfirmation(transactionHash, handleOnSuccess);
    }
  }
  async function handleEvmTransactionConfirmation(
    evmTransactionHash: `0x${string}`,
    handleOnSuccess: (receipt: TransactionReceipt | undefined) => void,
  ) {
    const confirmationReceipt = await publicClient?.waitForTransactionReceipt({
      hash: evmTransactionHash,
    });
    if (confirmationReceipt?.status !== 'success') {
      throw new Error('Transaction confirmation failed. Please try again');
    }
    handleOnSuccess(confirmationReceipt);
  }

  async function ensureCorrectEVMChain(paymentChainId: number): Promise<boolean> {
    if (!evmWalletAddress) {
      return false;
    }

    if (paymentChainId === chain?.id) {
      return true;
    }

    const targetChain = chains.find((chain) => chain.id === paymentChainId);
    if (!targetChain) {
      return false;
    }

    if (!switchChainAsync) {
      return false;
    }

    const switchedChain = await switchChainAsync({ chainId: targetChain.id });
    setIsEvmNetworkUpdated(switchedChain.id === paymentChainId);
    return false;
  }

  return { handleCryptoCheckout, isEvmNetworkUpdated };
};
