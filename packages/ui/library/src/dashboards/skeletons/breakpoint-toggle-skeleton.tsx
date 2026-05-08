export const BreakpointToggleSkeleton = () => {
	return (
		<div className="inline-flex gap-2 items-center rounded-lg border border-border/60 bg-muted/20 px-2 py-2 animate-pulse">
			{[...Array(6)].map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton items
				<div key={i} className="h-7 w-7 rounded-md bg-muted" />
			))}
		</div>
	);
};
