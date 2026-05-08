export const WidgetSkeleton = () => {
	return (
		<div className="animate-pulse rounded-xl border border-border/60 bg-gradient-to-br from-muted/40 to-muted/20 p-4 min-h-[140px] shadow-sm">
			<div className="h-4 w-2/3 bg-muted rounded mb-3" />
			<div className="h-3 w-1/2 bg-muted rounded mb-2" />
			<div className="h-3 w-1/4 bg-muted rounded" />
		</div>
	);
};
