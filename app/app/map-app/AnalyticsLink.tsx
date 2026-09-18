"use client";

import type { AnchorHTMLAttributes } from "react";

import { trackEvent } from "@/app/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  payload?: Record<string, unknown>;
};

export function AnalyticsLink({ eventName, payload = {}, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, payload);
        onClick?.(event);
      }}
    />
  );
}
