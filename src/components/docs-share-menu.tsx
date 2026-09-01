"use client";

import {
  DotsThree,
  EnvelopeSimple,
  Link as LinkIcon,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { useMemo } from "react";
import { toast } from "sonner";

import {
  BlueskyIcon,
  FacebookIcon,
  HackerNewsIcon,
  LinkedInIcon,
  RedditIcon,
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
} from "@/assets/socials";
import {
  docsToolbarButtonClass,
  docsToolbarIconSize,
} from "@/components/docs-toolbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const isShareCanceled = (error: unknown) =>
  error instanceof DOMException && error.name === "AbortError";

type ShareLinkItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
};

const buildShareLinks = (
  title: string,
  absoluteUrl: string
): ShareLinkItem[] => {
  const urlEncoded = encodeURIComponent(absoluteUrl);
  const titleEncoded = encodeURIComponent(title);
  const textEncoded = encodeURIComponent(`${title} ${absoluteUrl}`);

  return [
    {
      label: "Share on X",
      icon: XIcon,
      href: `https://x.com/intent/tweet?url=${urlEncoded}&text=${titleEncoded}`,
    },
    {
      label: "Share on LinkedIn",
      icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite?url=${urlEncoded}`,
    },
    {
      label: "Share on Bluesky",
      icon: BlueskyIcon,
      href: `https://bsky.app/intent/compose?text=${textEncoded}`,
    },
    {
      label: "Share on Facebook",
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`,
    },
    {
      label: "Share on Reddit",
      icon: RedditIcon,
      href: `https://www.reddit.com/submit?url=${urlEncoded}&title=${titleEncoded}`,
    },
    {
      label: "Share on Hacker News",
      icon: HackerNewsIcon,
      href: `https://news.ycombinator.com/submitlink?u=${urlEncoded}&t=${titleEncoded}`,
    },
    {
      label: "Share on WhatsApp",
      icon: WhatsAppIcon,
      href: `https://wa.me/?text=${textEncoded}`,
    },
    {
      label: "Share on Telegram",
      icon: TelegramIcon,
      href: `https://t.me/share/url?url=${urlEncoded}&text=${titleEncoded}`,
    },
    {
      label: "Share via email",
      icon: EnvelopeSimple,
      href: `mailto:?subject=${titleEncoded}&body=${textEncoded}`,
    },
  ];
};

export const DocsShareMenu = ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => {
  const { copyToClipboard } = useCopyToClipboard();
  const mounted = useMounted();

  const absoluteUrl = useMemo(() => {
    if (url.startsWith("http")) {
      return url;
    }
    if (typeof window !== "undefined") {
      return new URL(url, window.location.origin).toString();
    }
    return url;
  }, [url]);

  const shareLinks = useMemo(
    () => buildShareLinks(title, absoluteUrl),
    [title, absoluteUrl]
  );

  const canNativeShare =
    mounted && typeof navigator !== "undefined" && "share" in navigator;

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, url: absoluteUrl });
    } catch (error) {
      if (isShareCanceled(error)) {
        return;
      }

      toast.error("Could not open share sheet");
    }
  };

  return (
    <>
      {canNativeShare ? (
        <Button
          type="button"
          className={cn("sm:hidden", docsToolbarButtonClass)}
          variant="secondary"
          size={docsToolbarIconSize}
          aria-label="Share page"
          onClick={handleNativeShare}
        >
          <PaperPlaneTilt aria-hidden />
        </Button>
      ) : null}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={cn(
              docsToolbarButtonClass,
              canNativeShare && "hidden sm:flex"
            )}
            variant="secondary"
            size={docsToolbarIconSize}
            aria-label="Share page"
          >
            <PaperPlaneTilt aria-hidden />
            <span className="sr-only">Share</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-52"
          alignOffset={-6}
          collisionPadding={8}
        >
          <DropdownMenuItem
            onClick={() => {
              copyToClipboard(absoluteUrl);
              toast.success("Link copied");
            }}
          >
            <LinkIcon />
            Copy link
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {shareLinks.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem key={item.label} asChild>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <Icon />
                  {item.label}
                </a>
              </DropdownMenuItem>
            );
          })}

          {canNativeShare ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async (e) => {
                  e.preventDefault();
                  await handleNativeShare();
                }}
              >
                <DotsThree />
                Other app
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
