import type React from "react";

interface RowOverlayProps {
	rows: number;
	marginY: number;
	containerPaddingY: number;
	rowHeight: number;
}

export const RowOverlay: React.FC<RowOverlayProps> = ({
	rows,
	marginY,
	containerPaddingY,
	rowHeight,
}) => {
	const rowData = Array.from({ length: rows }, (_, i) => ({
		key: `row-${i}`,
		isLast: i === rows - 1,
	}));

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				zIndex: 10,
				pointerEvents: "none",
				display: "flex",
				flexDirection: "column",
				paddingTop: containerPaddingY,
				paddingBottom: containerPaddingY,
			}}
		>
			{rowData.map(({ key, isLast }) => (
				<div
					key={key}
					style={{
						position: "relative",
						width: "100%",
						height: rowHeight,
						marginBottom: isLast ? 0 : marginY,
						backgroundColor: "rgba(239, 68, 68, 0.2)",
						borderTop: "1px solid rgba(248, 113, 113, 0.4)",
						borderBottom: "1px solid rgba(248, 113, 113, 0.4)",
						borderRadius: "0.125rem",
					}}
				/>
			))}
		</div>
	);
};
