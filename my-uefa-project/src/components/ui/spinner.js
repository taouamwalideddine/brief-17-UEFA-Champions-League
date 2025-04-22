import { cn } from "@/lib/utils"

const Spinner = ({
  className,
  size = "default",
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-2 border-b-2 border-primary",
        {
          "h-4 w-4": size === "sm",
          "h-8 w-8": size === "default",
          "h-12 w-12": size === "md",
          "h-16 w-16": size === "lg",
        },
        className
      )}
      {...props}
    />
  )
}

export { Spinner }