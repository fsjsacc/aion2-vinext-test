"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { trackEvent } from "@/app/analytics";

type HomeTrackedLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "onClick"
> & {
  children: ReactNode;
  eventName: string;
  eventParams: Readonly<Record<string, boolean | number | string>>;
};

export function HomeTrackedLink({
  children,
  eventName,
  eventParams,
  ...anchorProps
}: HomeTrackedLinkProps) {
  return (
    <a
      {...anchorProps}
      onClick={() => trackEvent(eventName, eventParams)}
    >
      {children}
    </a>
  );
}
