import type { SearchResultRequestResponse } from 'src/types/api';

export const getPartnerTld = (tlds: string | string[]) => {
  const tld = typeof tlds === 'string' || Array.isArray(tlds) ? tlds.toString() : '';
  return tld;
};

export const nameTokenFormatter = (domain: {
  sld?: string | null;
  tld?: string | null;
  eoi: boolean;
}) => {
  if (!domain) {
    throw new Error('Name Token is not provided');
  }
  return `${domain.sld}${domain?.eoi ? '*' : '.'}${domain.tld}`;
};

export function formatWalletAddress(text = '', firstChunk = 4, lastChunk = 4) {
  if (typeof text === 'string' && text?.length > 10) {
    return `${text.slice(0, firstChunk)}...${text.slice(-lastChunk)}`;
  }
  return text;
}

export function getFilteredRecommendations(
  recommendations: SearchResultRequestResponse['pageItems'],
  searchResults: SearchResultRequestResponse['pageItems'],
) {
  // Remove duplicate between search and recommendations
  const filteredRecommendations = recommendations
    .filter(
      (recommendation) =>
        !searchResults.find(
          (searchResult) =>
            searchResult.sld === recommendation.sld && recommendation.tld === searchResult.tld,
        ),
    )
    .filter((item) => item?.status === 'available');
  return filteredRecommendations;
}

export const getIsICannDomain = (domain: { eoi: boolean }) => {
  return domain?.eoi === false;
};
