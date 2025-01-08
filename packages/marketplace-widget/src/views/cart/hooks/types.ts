export type RegistrantContact = {
  firstName: string;
  lastName: string;
  organization?: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
};

export type StartCheckoutOrderPayload = {
  paymentOptions: {
    contractAddress: `0x${string}` | string;
    tokenAddress?: `0x${string}` | string;
    buyerAddress: `0x${string}` | string;
  };
  names: {
    sld: string;
    tld: string;
    autoRenew: boolean;
    domainLength: number;
  }[];
  registrantContract?: RegistrantContact;
};

export type CheckoutState = {
  feedback: string | string[];
  isError: boolean;
  isTransactionInProgress: boolean;
  isOrderSuccess: boolean;
};

export type ContactInfo = {
  isFormOpen: boolean;
  contact?: RegistrantContact;
};
