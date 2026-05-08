"use client";

import { cn } from "@repo/ui-components/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";
import type * as React from "react";

const toggleVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"bg-transparent hover:bg-muted hover:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 active:scale-[0.98] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:hover:bg-accent/90",
				outline:
					"border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground hover:border-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 active:scale-[0.98] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:border-accent",
			},
			size: {
				default: "h-9 min-w-9 px-2",
				sm: "h-8 min-w-8 px-1.5",
				lg: "h-10 min-w-10 px-2.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Toggle({
	className,
	variant,
	size,
	...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive.Root
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
