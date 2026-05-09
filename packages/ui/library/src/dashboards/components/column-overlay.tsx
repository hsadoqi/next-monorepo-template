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
			style={{
				position: "absolute",
				inset: 0,
				zIndex: 10,
				pointerEvents: "none",
				display: "flex",
				paddingLeft: containerPaddingX,
				paddingRight: containerPaddingX,
			}}
		>
			{columnData.map(({ key, isLast }) => (
				<div
					key={key}
					style={{
						width: `${columnWidth}px`,
						marginRight: isLast ? 0 : marginX,
						position: "relative",
						height: "100%",
						backgroundColor: "rgba(59, 130, 246, 0.15)",
						borderLeft: "1px solid rgba(96, 165, 250, 0.4)",
						borderRight: "1px solid rgba(96, 165, 250, 0.4)",
						borderRadius: "0.125rem",
					}}
				/>
			))}
		</div>
	);
};
