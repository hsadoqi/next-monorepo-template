"use client";

import { useMemo, useState } from "react";

type Alignment = "left" | "center" | "right";

const FONT_FAMILIES = ["Inter", "Arial", "Roboto", "Georgia"];
const FONT_SIZES = ["12px", "14px", "16px", "18px"];

function ControlButton({
	active = false,
	label,
	onClick,
	children,
}: {
	active?: boolean;
	label: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			aria-label={label}
			onClick={onClick}
			className={[
				"h-9 min-w-9 rounded-md border px-3 text-sm font-medium transition-colors",
				active
					? "border-primary bg-primary/10 text-primary"
					: "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
			].join(" ")}
		>
			{children}
		</button>
	);
}

export function TextEditorToolbar() {
	const [fontFamily, setFontFamily] = useState("Inter");
	const [fontSize, setFontSize] = useState("14px");
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [alignment, setAlignment] = useState<Alignment>("left");

	const previewStyle = useMemo(
		() => ({
			fontFamily,
			fontSize,
			fontWeight: isBold ? 700 : 400,
			fontStyle: isItalic ? "italic" : "normal",
			textDecoration: isUnderline ? "underline" : "none",
			textAlign: alignment as "left" | "center" | "right",
		}),
		[alignment, fontFamily, fontSize, isBold, isItalic, isUnderline],
	);

	return (
		<div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
			<div className="flex flex-wrap items-center gap-2">
				<button
					type="button"
					className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
				>
					Ask AI
				</button>

				<select
					value={fontFamily}
					onChange={(event) => setFontFamily(event.target.value)}
					aria-label="Font family"
					className="h-9 rounded-md border border-border bg-background px-3 text-sm"
				>
					{FONT_FAMILIES.map((family) => (
						<option key={family} value={family}>
							{family}
						</option>
					))}
				</select>

				<select
					value={fontSize}
					onChange={(event) => setFontSize(event.target.value)}
					aria-label="Font size"
					className="h-9 rounded-md border border-border bg-background px-3 text-sm"
				>
					{FONT_SIZES.map((size) => (
						<option key={size} value={size}>
							{size}
						</option>
					))}
				</select>

				<div className="flex items-center gap-1">
					<ControlButton active={isBold} label="Bold" onClick={() => setIsBold((value) => !value)}>
						B
					</ControlButton>
					<ControlButton
						active={isItalic}
						label="Italic"
						onClick={() => setIsItalic((value) => !value)}
					>
						I
					</ControlButton>
					<ControlButton
						active={isUnderline}
						label="Underline"
						onClick={() => setIsUnderline((value) => !value)}
					>
						U
					</ControlButton>
				</div>

				<div className="flex items-center gap-1">
					<ControlButton
						active={alignment === "left"}
						label="Align left"
						onClick={() => setAlignment("left")}
					>
						L
					</ControlButton>
					<ControlButton
						active={alignment === "center"}
						label="Align center"
						onClick={() => setAlignment("center")}
					>
						C
					</ControlButton>
					<ControlButton
						active={alignment === "right"}
						label="Align right"
						onClick={() => setAlignment("right")}
					>
						R
					</ControlButton>
				</div>
			</div>

			<div className="rounded-md border border-border bg-background p-3">
				<p className="text-xs text-muted-foreground">Preview</p>
				<p className="mt-2 text-foreground" style={previewStyle}>
					This is sample text to preview the editor toolbar formatting controls.
				</p>
			</div>
		</div>
	);
}
