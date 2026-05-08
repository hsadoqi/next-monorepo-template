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
			className="absolute inset-0 z-10 pointer-events-none flex flex-col px-[10px]"
			style={{ paddingTop: containerPaddingY, paddingBottom: containerPaddingY }}
		>
			{rowData.map(({ key, isLast }) => (
				<div
					key={key}
					className="bg-red-500/20 w-full rounded-sm"
					style={{
						height: rowHeight,
						marginBottom: isLast ? 0 : marginY,
					}}
				/>
			))}
		</div>
	);
};
