import { isDarkMode, setDarkMode, toggleDarkMode } from "@repo/ui-theme-styles";
import { useEffect, useState } from "react";

/**
 * Hook to manage dark/light mode
 */
export function useThemeMode(): {
	isDark: boolean;
	toggle: () => void;
	setDark: (dark: boolean) => void;
} {
	const [isDark, setIsDark] = useState(isDarkMode());

	useEffect(() => {
		const checkDarkMode = () => setIsDark(isDarkMode());

		// Listen for changes to the class
		const observer = new MutationObserver(checkDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	const toggle = () => {
		toggleDarkMode();
		setIsDark(isDarkMode());
	};

	const setDark = (dark: boolean) => {
		setDarkMode(dark);
		setIsDark(dark);
	};

	return { isDark, toggle, setDark };
}
