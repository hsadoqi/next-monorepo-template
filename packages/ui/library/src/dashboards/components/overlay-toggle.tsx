"use client";

import { ToggleGroup, ToggleGroupItem } from "@repo/ui-components/ui/toggle-group";
import { Columns, Rows } from "lucide-react";
import type * as React from "react";

interface OverlayToggleProps {
	showRows: boolean;
	showCols: boolean;
	toggleRows: () => void;
	toggleCols: () => void;
}

export const OverlayToggle: React.FC<OverlayToggleProps> = ({
	showRows,
	showCols,
	toggleRows,
	toggleCols,
}) => {
	const selectedValues: string[] = [];
	if (showRows) selectedValues.push("rows");
	if (showCols) selectedValues.push("cols");

	return (
		<ToggleGroup
			type="multiple"
			value={selectedValues}
			size="sm"
			onValueChange={(val) => {
				if (val.includes("rows") && !showRows) toggleRows();
				if (!val.includes("rows") && showRows) toggleRows();
				if (val.includes("cols") && !showCols) toggleCols();
				if (!val.includes("cols") && showCols) toggleCols();
			}}
			className="gap-2 flex items-center rounded-lg border-2 border-border bg-muted/40 px-2 py-2 backdrop-blur-sm"
		>
			<ToggleGroupItem
				value="cols"
				aria-label="Toggle columns overlay"
				className="relative data-[state=off]:bg-transparent data-[state=on]:bg-gradient-to-br data-[state=on]:from-blue-500/40 data-[state=on]:to-blue-600/20 data-[state=on]:text-blue-700 data-[state=on]:border-2 data-[state=on]:border-blue-500/60 hover:bg-blue-100/20 transition-all"
			>
				<span className="sr-only">Toggle Columns Overlay</span>
				<Columns className="h-5 w-5" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="rows"
				aria-label="Toggle rows overlay"
				className="relative data-[state=off]:bg-transparent data-[state=on]:bg-gradient-to-br data-[state=on]:from-red-500/40 data-[state=on]:to-red-600/20 data-[state=on]:text-red-700 data-[state=on]:border-2 data-[state=on]:border-red-500/60 hover:bg-red-100/20 transition-all"
			>
				<span className="sr-only">Toggle Rows Overlay</span>
				<Rows className="h-5 w-5" />
			</ToggleGroupItem>
		</ToggleGroup>
	);
};
