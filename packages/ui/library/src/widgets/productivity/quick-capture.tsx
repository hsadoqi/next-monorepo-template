import { Button } from "@repo/ui-components/ui/button";
import { Card } from "@repo/ui-components/ui/card";
import { Input } from "@repo/ui-components/ui/input";
import { Send } from "lucide-react";
import type React from "react";
import { useState } from "react";

export const QuickCapture: React.FC = () => {
	const [value, setValue] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (value.trim()) {
			// Handle submission
			setValue("");
		}
	};

	return (
		<Card className="p-4">
			<h3 className="font-semibold mb-3">Quick Capture</h3>
			<form onSubmit={handleSubmit} className="flex gap-2">
				<Input
					placeholder="Capture a thought..."
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="flex-1"
				/>
				<Button type="submit" size="icon" disabled={!value.trim()} aria-label="Send">
					<Send className="w-4 h-4" />
				</Button>
			</form>
		</Card>
	);
};
