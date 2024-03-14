import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm text-gray-600 file:text-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-background ring-offset-background",
        error: "ring-2 ring-red-400",
      },
      // size: {
      //   default: "h-10 px-4 py-2",
      //   sm: "h-9 rounded-md px-3",
      //   lg: "h-11 rounded-md px-8",
      //   icon: "h-10 w-10",
      // },
    },
    defaultVariants: {
      variant: "default",
      // size: "default",
    },
  }
)


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
