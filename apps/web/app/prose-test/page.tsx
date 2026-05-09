/**
 * Test component demonstrating Tailwind Typography plugin with theme presets
 */

export default function ProseTest() {
	return (
		<div className="space-y-16 p-8">
			{/* Default theme */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Default Theme</h2>
				<article className="prose prose-theme-default max-w-none">
					<h1>The Art of Typography</h1>
					<p>
						Beautiful typographic defaults make prose readable without custom CSS. This paragraph
						demonstrates the default prose styling with proper line height, font size, and spacing.
					</p>
					<h2>Key Features</h2>
					<ul>
						<li>Readable line length</li>
						<li>Appropriate font sizes</li>
						<li>Proper spacing between elements</li>
						<li>Beautiful link styling</li>
					</ul>
					<p>
						Code blocks are also styled: <code>const greeting = "Hello, World!";</code>
					</p>
					<blockquote>Great typography is invisible. It doesn't get in the way.</blockquote>
				</article>
			</section>

			{/* Muted theme */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Muted Theme</h2>
				<article className="prose prose-theme-muted max-w-none">
					<h1>Subtle and Minimal</h1>
					<p>
						This prose uses the muted theme for a more subdued, minimal appearance. Perfect for
						secondary content or sidebars.
					</p>
					<h2>When to Use</h2>
					<ul>
						<li>Documentation sidebars</li>
						<li>Secondary reading areas</li>
						<li>Footnotes and asides</li>
					</ul>
				</article>
			</section>

			{/* Brand theme */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Brand Theme</h2>
				<article className="prose prose-theme-brand max-w-none">
					<h1>Branded Content</h1>
					<p>
						This theme emphasizes your brand accent color throughout. Use this for featured content
						and announcements.
					</p>
					<h2>Perfect For</h2>
					<ul>
						<li>Hero sections</li>
						<li>Featured articles</li>
						<li>Brand-forward messaging</li>
					</ul>
				</article>
			</section>

			{/* With responsive sizing */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Responsive Sizing</h2>
				<article className="prose prose-theme-default prose-sm md:prose-base lg:prose-lg max-w-none">
					<h1>Resize Your Browser</h1>
					<p>
						This prose uses responsive size modifiers: <code>prose-sm</code> on mobile,{" "}
						<code>prose-base</code> on tablets, and <code>prose-lg</code> on desktop.
					</p>
					<p>
						The typography automatically scales appropriately for each breakpoint, ensuring
						readability on all screen sizes.
					</p>
				</article>
			</section>

			{/* With dark mode */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Dark Mode Support</h2>
				<article className="prose prose-theme-default dark:prose-invert max-w-none">
					<h1>Automatic Dark Mode</h1>
					<p>
						Add <code>dark:prose-invert</code> to automatically invert colors in dark mode. The
						plugin handles all the color inversions for you.
					</p>
				</article>
			</section>
		</div>
	);
}
