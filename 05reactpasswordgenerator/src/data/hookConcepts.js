export const hookConcepts = [
    {
        id: "use-state",
        name: "useState",
        purpose: "Stores values that affect the rendered UI.",
        projectUsage:
            "Stores the generated password, selected length, enabled options, and copied feedback state.",
        dependencyExplanation: "useState does not use a dependency array.",
    },
    {
        id: "use-callback",
        name: "useCallback",
        purpose:
            "Returns a memoized function reference that stays the same between renders until one of its dependencies changes.",
        projectUsage:
            "Keeps generatePassword and copyPasswordToClipboard as stable callback references for effects and event handlers.",
        dependencyExplanation:
            "Its dependencies decide when React should create a new function reference. The function still only runs when something calls it.",
    },
    {
        id: "use-effect",
        name: "useEffect",
        purpose:
            "Runs side-effect code after React commits a render, and can clean up before running again or before unmounting.",
        projectUsage:
            "Regenerates the password when generation settings change and clears the Copied feedback after a short delay.",
        dependencyExplanation:
            "Its dependencies decide when the effect should run again after a committed render.",
    },
    {
        id: "use-ref",
        name: "useRef",
        purpose:
            "Stores a mutable value across renders without causing another render, and can reference a real DOM element.",
        projectUsage:
            "References the password input so the app can focus and select the generated password before copying it.",
        dependencyExplanation:
            "The ref object has a stable identity, and updating ref.current does not trigger a render.",
    },
];