import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-[#3182f6] text-primary-foreground hover:bg-[#1b64da]",
        gray: "bg-[#f2f4f6] text-[#4e5968] hover:bg-[#d1d6db]",
        link: "text-[#4e5968] underline-offset-4 hover:underline gap-[6px] hover:bg-[rgba(2,32,71,0.05)]",
        destructive: "bg-transparent text-[#4e5968]  hover:bg-[#d1d6db]",
      },
      size: {
        default: "h-8 px-2 py-3 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
