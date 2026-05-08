"use client";

import { useEffect, useState } from "react";

interface ColumnOverlayProps {
	cols: number;
	marginX: number;
	containerPaddingX: number;
	containerWidth: number;
}

export const ColumnOverlay = ({
	cols,
	marginX,
	containerPaddingX,
	containerWidth,
}: ColumnOverlayProps) => {
	const [columnWidth, setColumnWidth] = useState(0);

	useEffect(() => {
		if (containerWidth <= 0) return;
		const usableWidth = containerWidth - containerPaddingX * 2 - marginX * (cols - 1);
		setColumnWidth(usableWidth / cols);
	}, [cols, marginX, containerPaddingX, containerWidth]);

	const columnData = Array.from({ length: cols }, (_, i) => ({
		key: `col-${i}`,
		isLast: i === cols - 1,
	}));

	return (
		<div
			className="absolute inset-0 z-10 pointer-events-none flex"
			style={{ paddingLeft: containerPaddingX, paddingRight: containerPaddingX }}
		>
			{columnData.map(({ key, isLast }) => (
				<div
					key={key}
					style={{
						width: `${columnWidth}px`,
						marginRight: isLast ? 0 : `${marginX}px`,
					}}
					className="bg-blue-500/10 h-full rounded-sm"
				/>
			))}
		</div>
	);
};
