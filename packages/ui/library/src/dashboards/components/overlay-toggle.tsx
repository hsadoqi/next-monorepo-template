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
			className="gap-1 flex items-center rounded-lg border border-border/60 bg-muted/20 px-1 py-1"
		>
			<ToggleGroupItem
				value="cols"
				aria-label="Toggle columns overlay"
				className="data-[state=on]:bg-blue-500/20 data-[state=on]:text-blue-700"
			>
				<span className="sr-only">Toggle Columns Overlay</span>
				<Columns className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="rows"
				aria-label="Toggle rows overlay"
				className="data-[state=on]:bg-red-500/20 data-[state=on]:text-red-700"
			>
				<span className="sr-only">Toggle Rows Overlay</span>
				<Rows className="h-4 w-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	);
};
