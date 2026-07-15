export const learningConcepts = [
    {
        id: "custom-hooks",
        title: "Custom Hooks",
        summary: "Reusable functions that package hook-based React logic.",
        projectUsage:
            "useCurrencyInfo handles currency fetching, loading, errors, cancellation, and rate normalization.",
    },
    {
        id: "use-effect",
        title: "useEffect",
        summary:
            "Runs side-effect code after React commits a render and dependencies change.",
        projectUsage:
            "The custom hook fetches new rate data whenever the selected source currency changes.",
    },
    {
        id: "controlled-inputs",
        title: "Controlled Inputs",
        summary:
            "Form values come from React state, and user changes update that state through callbacks.",
        projectUsage:
            "The amount input, source select, and target select are controlled by amount, fromCurrency, and toCurrency.",
    },
    {
        id: "props",
        title: "Props",
        summary:
            "Props let a parent component configure reusable child components.",
        projectUsage:
            "The same InputBox component renders both the source and target currency fields with different props.",
    },
    {
        id: "stable-list-keys",
        title: "Stable List Keys",
        summary:
            "Keys help React preserve list item identity during reconciliation.",
        projectUsage:
            "Each currency option uses its unique currency code as the React key.",
    },
    {
        id: "fetch-api",
        title: "Fetch API",
        summary:
            "The browser's built-in API for making network requests.",
        projectUsage:
            "useCurrencyInfo uses fetch to request conversion rates from a public currency endpoint.",
    },
    {
        id: "abort-controller",
        title: "AbortController",
        summary:
            "A browser API that can cancel fetch requests that are no longer needed.",
        projectUsage:
            "When the source currency changes quickly, the previous request is aborted so stale data does not overwrite newer data.",
    },
    {
        id: "separation-of-concerns",
        title: "Separation of Concerns",
        summary:
            "Keep data logic, presentation, and configuration in focused files.",
        projectUsage:
            "API configuration lives in config, fetching logic lives in a hook, learning copy lives in data, and UI lives in components.",
    },
];