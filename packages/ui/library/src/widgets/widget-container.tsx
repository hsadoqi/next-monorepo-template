"use client";

import { Button } from "@repo/ui-components/atoms";
import { cn } from "@repo/ui-components/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@repo/ui-components/molecules";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from "@repo/ui-components/organisms";
import { ChevronDown, Copy, Maximize2, RotateCw, Settings, Trash2 } from "lucide-react";
import * as React from "react";

export interface WidgetContainerProps {
	id: string;
	title: string;
	children: React.ReactNode;
	className?: string;
	onSettingsClick?: () => void;
	onRefresh?: () => void;
	onDuplicate?: () => void;
	onDelete?: () => void;
	onToggleFullscreen?: () => void;
	isFullscreen?: boolean;
	showSettings?: boolean;
	showTheme?: boolean;
	showRefresh?: boolean;
	showDuplicate?: boolean;
	showDelete?: boolean;
	showFullscreen?: boolean;
	customTheme?: {
		background?: string;
		foreground?: string;
		accent?: string;
	};
}

export function WidgetContainer({
	id,
	title,
	children,
	className,
	onSettingsClick,
	onRefresh,
	onDuplicate,
	onDelete,
	onToggleFullscreen,
	isFullscreen = false,
	showSettings = true,
	showTheme = true,
	showRefresh = true,
	showDuplicate = true,
	showDelete = true,
	showFullscreen = true,
	customTheme,
}: WidgetContainerProps) {
	const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
	const [localTheme, setLocalTheme] = React.useState<"light" | "dark" | "auto">("auto");

	// Save theme to localStorage
	React.useEffect(() => {
		const key = `widget-theme:${id}`;
		localStorage.setItem(key, localTheme);
	}, [id, localTheme]);

	// Load theme from localStorage on mount
	React.useEffect(() => {
		const key = `widget-theme:${id}`;
		const saved = localStorage.getItem(key);
		if (saved === "light" || saved === "dark" || saved === "auto") {
			setLocalTheme(saved);
		}
	}, [id]);

	const themeClass = React.useMemo(() => {
		if (localTheme === "auto") return "";
		if (localTheme === "dark") return "dark";
		return "light";
	}, [localTheme]);

	return (
		<>
			<div
				className={cn(
					"flex h-full flex-col rounded-lg border bg-card shadow-sm",
					{
						dark: themeClass === "dark",
					},
					className,
				)}
				style={
					customTheme
						? {
								backgroundColor: customTheme.background,
								color: customTheme.foreground,
							}
						: undefined
				}
			>
				{/* Header */}
				<div className="flex items-center justify-between border-b p-3">
					<div className="flex items-center gap-2">
						<h2 className="text-sm font-semibold">{title}</h2>
					</div>

					<div className="flex items-center gap-1">
						{/* Theme Toggle */}
						{showTheme && (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="ghost"
										size="sm"
										className="h-8 w-8 p-0"
										title="Theme"
										aria-label="Theme"
									>
										<ChevronDown className="h-4 w-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										onClick={() => setLocalTheme("auto")}
										className={localTheme === "auto" ? "bg-accent" : ""}
									>
										Auto
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setLocalTheme("light")}
										className={localTheme === "light" ? "bg-accent" : ""}
									>
										Light
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setLocalTheme("dark")}
										className={localTheme === "dark" ? "bg-accent" : ""}
									>
										Dark
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)}

						{/* Refresh */}
						{showRefresh && onRefresh && (
							<Button
								variant="ghost"
								size="sm"
								className="h-8 w-8 p-0"
								onClick={onRefresh}
								title="Refresh"
								aria-label="Refresh"
							>
								<RotateCw className="h-4 w-4" />
							</Button>
						)}

						{/* Settings */}
						{showSettings && onSettingsClick && (
							<Button
								variant="ghost"
								size="sm"
								className="h-8 w-8 p-0"
								onClick={onSettingsClick}
								title="Settings"
								aria-label="Settings"
							>
								<Settings className="h-4 w-4" />
							</Button>
						)}

						{/* Actions Menu */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="h-8 w-8 p-0"
									title="More options"
									aria-label="More options"
								>
									⋮
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{showDuplicate && onDuplicate && (
									<DropdownMenuItem onClick={onDuplicate}>
										<Copy className="mr-2 h-4 w-4" />
										Duplicate
									</DropdownMenuItem>
								)}
								{showFullscreen && onToggleFullscreen && (
									<DropdownMenuItem onClick={onToggleFullscreen}>
										<Maximize2 className="mr-2 h-4 w-4" />
										{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
									</DropdownMenuItem>
								)}
								{showDelete && onDelete && (
									<>
										<DropdownMenuItem
											onClick={() => setShowDeleteConfirm(true)}
											className="text-destructive"
										>
											<Trash2 className="mr-2 h-4 w-4" />
											Delete
										</DropdownMenuItem>
									</>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-auto">{children}</div>
			</div>

			{/* Delete Confirmation Dialog */}
			<AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
				<AlertDialogContent
					title="Delete widget?"
					description="This action cannot be undone. The widget and all its data will be permanently deleted."
				>
					<div className="flex gap-3 justify-end">
						<AlertDialogCancel variant="destructive" size="sm">
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							variant="outline"
							size="sm"
							onClick={() => {
								setShowDeleteConfirm(false);
								onDelete?.();
							}}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Delete
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
