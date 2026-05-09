import { Button } from "@repo/ui-components";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans px-4">
			<main className="flex flex-col items-center gap-6 text-center">
				<h1 className="text-4xl font-semibold leading-10 tracking-tight text-black">
					Welcome to Portfolio v2
				</h1>
				<p className="max-w-md text-lg leading-8 text-zinc-600">
					Powered by Next.js, Tailwind CSS v4, Biome, and Shadcn UI.
				</p>
				<Button variant="default">This is a Shadcn Button!</Button>
				<Link
					href="/prose-test"
					className="mt-6 text-sm text-blue-600 hover:text-blue-800 underline"
				>
					View Typography Plugin Test →
				</Link>
			</main>
		</div>
	);
}
