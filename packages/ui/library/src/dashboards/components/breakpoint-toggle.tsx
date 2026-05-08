"use client";

import { ToggleGroup, ToggleGroupItem } from "@repo/ui-components/ui/toggle-group";
import { Laptop, Monitor, MonitorSmartphone, Phone, Smartphone, Tablet } from "lucide-react";
import * as React from "react";
import { type BreakpointType, defaultBreakpoints } from "../grid/types";

interface BreakpointToggleProps {
	value: BreakpointType;
	onChange: (value: BreakpointType) => void;
	containerWidth?: number;
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

export const BreakpointToggle: React.FC<BreakpointToggleProps> = ({
	value,
	onChange,
	containerWidth = Infinity,
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

	return (
		<ToggleGroup
			type="single"
			value={value}
			size="sm"
			onValueChange={(val) => {
				if (val) onChange(val as BreakpointType);
			}}
			className="gap-1 flex items-center rounded-lg border border-border/60 bg-muted/20 px-1 py-1"
		>
			{availableBreakpoints.map((bp) => (
				<ToggleGroupItem
					key={bp}
					value={bp}
					aria-label={bp.toUpperCase()}
					className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
				>
					{breakpointIcons[bp]}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
};
