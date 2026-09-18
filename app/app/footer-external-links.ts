import { headers } from "next/headers";

import {
  externalLinkScalePercentFromValue,
  decodeExternalLinkRecords,
  TRUSTED_EXTERNAL_LINKS_HEADER,
  TRUSTED_EXTERNAL_LINK_SCALE_HEADER,
  type ExternalLinkRecord,
} from "./external-link-values";

export type FooterExternalLinkConfiguration = {
  links: ExternalLinkRecord[];
  scalePercent: number;
};

export async function getFooterExternalLinkConfiguration(): Promise<FooterExternalLinkConfiguration> {
  const requestHeaders = await headers();
  return {
    links: decodeExternalLinkRecords(
      requestHeaders.get(TRUSTED_EXTERNAL_LINKS_HEADER),
    ),
    scalePercent: externalLinkScalePercentFromValue(
      requestHeaders.get(TRUSTED_EXTERNAL_LINK_SCALE_HEADER),
    ),
  };
}
