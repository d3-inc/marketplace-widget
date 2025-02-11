import { formatBelowThresholdAmount } from '../../utils/currency.js';

export const ThresholdFloorPrice = ({
  usdPrice,
  nativeCurrency,
}: {
  usdPrice: boolean;
  nativeCurrency?: string;
}) => {
  if (usdPrice) {
    return (
      <span>
        {'< '}
        {formatBelowThresholdAmount({
          amount: 0.01,
          localeCode: navigator?.language,
          showCurrencySymbol: true,
        })}
      </span>
    );
  }

  return (
    <>
      {'<'}
      <span className="notranslate">
        {formatBelowThresholdAmount({
          amount: 0.01,
          localeCode: navigator?.language,
          showCurrencySymbol: usdPrice,
        })}
        &nbsp;{nativeCurrency ?? ''}
      </span>
    </>
  );
};
