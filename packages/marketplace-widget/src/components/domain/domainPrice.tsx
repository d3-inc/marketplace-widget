import clsx from 'clsx';

import {
  currencyConfigForFractionDigits,
  MARKETPLACE_AMOUNT_FLOOR_LIMIT,
  numbersConfigForFractionDigits,
} from '../../config/constants.js';
import type { SearchResult } from '../../types/api.js';
import { currencyFormatter } from '../../utils/currency.js';
import { ThresholdFloorPrice } from './thresholdFloorPrice.js';

export interface DomainPriceProps {
  isDomainLocked: boolean;
  domain: SearchResult;
}

export const PriceInUsd = ({
  hasFirstYearDiscount,
  convertedRegistryUsdPrice,
  convertedRegistryFirstYearUsdPrice,
}: {
  hasFirstYearDiscount: boolean;
  convertedRegistryUsdPrice: number;
  convertedRegistryFirstYearUsdPrice: number;
}) => {
  if (hasFirstYearDiscount) {
    return (
      <span className={clsx('mb-0 flex gap-2 notranslate')}>
        <span>
          {convertedRegistryFirstYearUsdPrice < MARKETPLACE_AMOUNT_FLOOR_LIMIT ? (
            <ThresholdFloorPrice usdPrice />
          ) : (
            currencyFormatter({
              amount: convertedRegistryFirstYearUsdPrice ?? 0,
              config: currencyConfigForFractionDigits,
              localeCode: navigator?.language,
              showCompactPrice: true,
            })
          )}
          <span>/yr</span>
        </span>
        <span className="line-through">
          {convertedRegistryUsdPrice < MARKETPLACE_AMOUNT_FLOOR_LIMIT ? (
            <ThresholdFloorPrice usdPrice />
          ) : (
            currencyFormatter({
              amount: convertedRegistryUsdPrice ?? 0,
              config: currencyConfigForFractionDigits,
              localeCode: navigator?.language,
              showCompactPrice: true,
            })
          )}
        </span>
      </span>
    );
  }
  return (
    <span className={clsx('mb-0 notranslate')}>
      {convertedRegistryFirstYearUsdPrice < MARKETPLACE_AMOUNT_FLOOR_LIMIT ? (
        <ThresholdFloorPrice usdPrice />
      ) : (
        currencyFormatter({
          amount: convertedRegistryFirstYearUsdPrice ?? 0,
          config: currencyConfigForFractionDigits,
          localeCode: navigator?.language,
          showCompactPrice: true,
        })
      )}
      <span>/yr</span>
    </span>
  );
};

export const DomainPrice = ({ domain, isDomainLocked }: DomainPriceProps) => {
  const { registryUsdPrice, registryFirstYearUsdPrice, registryFirstYearNativePrice } =
    domain || {};
  const convertedRegistryFirstYearUsdPrice = Number(registryFirstYearUsdPrice);
  const convertedFirstYearNativePrice = Number(registryFirstYearNativePrice);
  const convertedRegistryUsdPrice = Number(registryUsdPrice);
  const hasFirstYearDiscount =
    (convertedRegistryUsdPrice ?? 0) > (convertedRegistryFirstYearUsdPrice ?? 0);
  // In case of unavailable/locked domain, we don't need to show any pricing info
  // for that domain card
  if (isDomainLocked) {
    return (
      <div className={'flex items-end'}>
        <p className={'mb-0'}>Unavailable</p>
      </div>
    );
  }

  return (
    <div className={clsx('flex items-end flex-col')}>
      {convertedFirstYearNativePrice ? (
        <>
          <strong>
            {convertedFirstYearNativePrice < MARKETPLACE_AMOUNT_FLOOR_LIMIT ? (
              <ThresholdFloorPrice usdPrice={false} nativeCurrency={domain?.nativeCurrency} />
            ) : (
              <>
                <span className="notranslate">
                  {currencyFormatter({
                    amount: convertedFirstYearNativePrice ?? 0,
                    config: numbersConfigForFractionDigits,
                    localeCode: navigator?.language,
                    showCompactPrice: true,
                  })}
                </span>
                <span>&nbsp;{domain?.nativeCurrency}</span>
              </>
            )}
          </strong>
          <PriceInUsd
            hasFirstYearDiscount={hasFirstYearDiscount}
            convertedRegistryUsdPrice={convertedRegistryUsdPrice}
            convertedRegistryFirstYearUsdPrice={convertedRegistryFirstYearUsdPrice}
          />
        </>
      ) : (
        <strong className={clsx('mb-0')}>
          <PriceInUsd
            hasFirstYearDiscount={hasFirstYearDiscount}
            convertedRegistryUsdPrice={convertedRegistryUsdPrice}
            convertedRegistryFirstYearUsdPrice={convertedRegistryFirstYearUsdPrice}
          />
        </strong>
      )}
      <span className={clsx('mb-0 notranslate')}>
        Renews:&nbsp;
        <strong>
          {convertedRegistryUsdPrice < MARKETPLACE_AMOUNT_FLOOR_LIMIT ? (
            <ThresholdFloorPrice usdPrice />
          ) : (
            currencyFormatter({
              amount: convertedRegistryUsdPrice ?? 0,
              config: currencyConfigForFractionDigits,
              localeCode: navigator?.language,
              showCompactPrice: true,
            })
          )}
        </strong>
        <span>/yr</span>
      </span>
    </div>
  );
};
