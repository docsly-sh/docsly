import { cn } from "@/lib/utils";

export type BrandIconProps = React.ComponentProps<"svg">;

export const createBrandIcon = (
  path: string,
  options?: { viewBox?: string; defaultClassName?: string }
) => {
  const {
    viewBox = "0 0 24 24",
    defaultClassName = "size-4 shrink-0",
  } = options ?? {};

  const Icon = ({ className, ...props }: BrandIconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="currentColor"
      className={cn(defaultClassName, className)}
      {...props}
    >
      <path d={path} />
    </svg>
  );

  return Icon;
};
