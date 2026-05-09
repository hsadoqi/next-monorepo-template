import { useEffect, useState } from "react";
import { getBreakpointForWidth } from "../grid/grid-utils";
import type { BreakpointType } from "../grid/types";

/**
 * Hook for managing breakpoint toggle state with auto-update and manual override.
 *
 * Features:
 * - Auto-updates breakpoint when containerWidth changes
 * - Respects manual user selection (isCustom flag)
 * - Provides reset functionality to return to auto-mode
 *
 * @param initialBreakpoint - Initial breakpoint value
 * @param initialContainerWidth - Initial container width
 * @returns Object containing state and handlers
 */
export const useBreakpointToggleState = (
    initialBreakpoint: BreakpointType = "lg",
    initialContainerWidth: number = 1600,
) => {
    const [value, setValue] = useState<BreakpointType>(initialBreakpoint);
    const [containerWidth, setContainerWidth] = useState(initialContainerWidth);
    const [isCustom, setIsCustom] = useState(false);

    // Auto-update breakpoint when container width changes (unless user manually set it)
    useEffect(() => {
        if (!isCustom) {
            const newBreakpoint = getBreakpointForWidth(containerWidth) as BreakpointType;
            setValue(newBreakpoint);
        }
    }, [containerWidth, isCustom]);

    const handleBreakpointChange = (bp: BreakpointType) => {
        setValue(bp);
        setIsCustom(true); // User manually set it
    };

    const handleReset = () => {
        const newBreakpoint = getBreakpointForWidth(containerWidth) as BreakpointType;
        setValue(newBreakpoint);
        setIsCustom(false); // Clear custom flag
    };

    return {
        value,
        containerWidth,
        isCustom,
        setValue,
        setContainerWidth,
        handleBreakpointChange,
        handleReset,
    };
};
