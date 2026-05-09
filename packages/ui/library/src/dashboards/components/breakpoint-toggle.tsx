"use client";

import { cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui-components";
import { ToggleGroup, ToggleGroupItem } from "@repo/ui-components/ui/toggle-group";
import { Laptop, Monitor, MonitorSmartphone, Phone, Smartphone, Tablet } from "lucide-react";
import * as React from "react";
import { type BreakpointType, defaultBreakpoints } from "../grid/types";

interface BreakpointToggleProps {
	value: BreakpointType;
	onChange: (value: BreakpointType) => void;
	containerWidth?: number;
	showLabels?: boolean;
}

const breakpointIcons: Record<BreakpointType, React.ReactNode> = {
	xxs: <Phone className="h-4 w-4" />,
	xs: <Smartphone className="h-4 w-4" />,
	sm: <MonitorSmartphone className="h-4 w-4" />,
	md: <Tablet className="h-4 w-4" />,
	lg: <Laptop className="h-4 w-4" />,
	xl: <Monitor className="h-4 w-4" />,
	xxl: <Monitor className="h-4 w-4" />,
};

const breakpointLabels: Record<BreakpointType, string> = {
	xxs: "xxs",
	xs: "xs",
	sm: "sm",
	md: "md",
	lg: "lg",
	xl: "xl",
	xxl: "xxl",
};

export const BreakpointToggle: React.FC<BreakpointToggleProps> = ({
	value,
	onChange,
	containerWidth = Infinity,
	showLabels = false,
}) => {
	const availableBreakpoints = (Object.keys(defaultBreakpoints) as BreakpointType[]).filter(
		(bp) => defaultBreakpoints[bp] <= containerWidth,
	);

	React.useEffect(() => {
		if (!availableBreakpoints.includes(value)) {
			const fallback = availableBreakpoints[availableBreakpoints.length - 1];
			if (fallback) onChange(fallback);
		}
	}, [availableBreakpoints, value, onChange]);

	const breakpointToggle = (
		<ToggleGroup
			type="single"
			value={value}
			size="sm"
			onValueChange={(val) => {
				if (val) onChange(val as BreakpointType);
			}}
			className="gap-2 flex items-center rounded-lg border-2 border-border bg-muted/40 px-2 py-2 backdrop-blur-sm"
		>
			{availableBreakpoints.map((bp, idx) => {
				const disabledBp = defaultBreakpoints[bp] > containerWidth;
				return (
					!disabledBp && (
						<Tooltip key={bp}>
							<TooltipTrigger asChild>
								<ToggleGroupItem
									value={bp}
									aria-label={bp.toUpperCase()}
									className={cn(
										"relative flex flex-col items-center gap-1 transition-all rounded-md",
										"data-[state=off]:text-muted-foreground data-[state=off]:hover:bg-primary/10",
										"data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-lg data-[state=on]:shadow-primary/40 data-[state=on]:font-semibold",
										{
											"cursor-not-allowed opacity-50": disabledBp,
											"rounded-l-md": idx === 0,
											"rounded-r-md": idx === availableBreakpoints.length - 1,
											"ml-0": idx === 0,
											"-ml-px": idx > 0,
											"mr-0": idx === availableBreakpoints.length - 1,
											"-mr-px": idx < availableBreakpoints.length - 1,
											"px-2": showLabels,
											"px-1.5": !showLabels,
										},
									)}
									disabled={disabledBp}
								>
									{breakpointIcons[bp]}
									{showLabels && (
										<span className="text-xs font-semibold">{breakpointLabels[bp]}</span>
									)}
								</ToggleGroupItem>
							</TooltipTrigger>
							{!showLabels && (
								<TooltipContent>
									{breakpointLabels[bp]} ({defaultBreakpoints[bp]}px)
								</TooltipContent>
							)}
						</Tooltip>
					)
				);
			})}
		</ToggleGroup>
	);

	if (!showLabels) {
		return <TooltipProvider>{breakpointToggle}</TooltipProvider>;
	}

	return breakpointToggle;
};
