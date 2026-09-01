import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type Neighbour = {
  name: React.ReactNode;
  url: string;
};

type DocNeighboursProps = {
  previous: Neighbour | null | undefined;
  next: Neighbour | null | undefined;
  variant: "header" | "footer";
};

export const DocNeighbours = ({
  previous,
  next,
  variant,
}: DocNeighboursProps) => {
  if (!previous && !next) {
    return null;
  }

  if (variant === "header") {
    return (
      <>
        {previous && (
          <Link
            href={previous.url}
            className="text-muted-foreground hover:text-foreground mb-2 inline-flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="size-3.5" />
            {previous.name}
          </Link>
        )}
        {next && (
          <Link
            href={next.url}
            className="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1.5 text-sm sm:pt-7"
          >
            {next.name}
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </>
    );
  }

  return (
    <>
      {previous && (
        <Link
          href={previous.url}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="size-3.5" />
          {previous.name}
        </Link>
      )}
      {next && (
        <Link
          href={next.url}
          className="text-muted-foreground hover:text-foreground ml-auto inline-flex items-center gap-1.5 text-sm"
        >
          {next.name}
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </>
  );
};
