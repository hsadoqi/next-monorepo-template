import { WidgetSkeleton } from "./widget-skeleton";

export const WidgetGridSkeleton = ({ count = 6 }: { count?: number }) => {
	return (
		<div className="grid w-full gap-4 px-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
			{[...Array(count)].map((_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton items
				<WidgetSkeleton key={i} />
			))}
		</div>
	);
};
