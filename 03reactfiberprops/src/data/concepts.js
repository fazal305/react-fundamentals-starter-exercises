export const concepts = [
    {
        id: "browser-dom",
        title: "Browser DOM",
        summary:
            "The DOM is the browser's live object representation of the loaded HTML document.",
        details:
            "A normal page reload replaces the current document with a newly loaded document. JavaScript can also update individual DOM elements directly without reloading the page. React helps you describe the UI with components and state, then decides which browser DOM changes are needed after state or props change.",
    },
    {
        id: "react-tree",
        title: "React Tree",
        summary:
            "React components produce a tree of elements that describes what the UI should look like.",
        details:
            "When a component renders, it returns React elements. Those elements form a tree. React keeps track of the previous rendered tree and the next rendered tree so it can decide what should change in the real browser DOM.",
    },
    {
        id: "virtual-dom",
        title: "Virtual DOM",
        summary:
            "Virtual DOM is a common name for React's in-memory representation of UI elements.",
        details:
            "React compares previous and next UI descriptions to determine an efficient set of DOM updates based on its reconciliation rules. This does not mean React always calculates the mathematically smallest possible DOM operation, but it avoids rebuilding unrelated DOM nodes unnecessarily.",
    },
    {
        id: "reconciliation",
        title: "Reconciliation",
        summary:
            "Reconciliation is React's process for comparing the previous rendered element tree with the next rendered element tree.",
        details:
            "React compares element types, component types, props, child order, and list keys. These rules help React decide when to preserve component state, when to reset it, which children moved, and which DOM nodes need to be updated, created, or removed.",
    },
    {
        id: "fiber",
        title: "Fiber",
        summary:
            "Fiber is React's internal architecture for managing and scheduling rendering work.",
        details:
            "Fiber lets React break rendering work into units, prioritize important updates, pause or resume rendering work where supported, avoid blocking the browser unnecessarily, and separate the render phase from the commit phase. Network requests and React state updates are separate concepts.",
    },
    {
        id: "render-phase",
        title: "Render Phase",
        summary:
            "The render phase is where React calculates what the UI should look like.",
        details:
            "During the render phase, React calls component functions and builds the next description of the UI. This phase should stay pure: components should calculate UI from props and state, not directly change the browser DOM.",
    },
    {
        id: "commit-phase",
        title: "Commit Phase",
        summary:
            "The commit phase is where React applies the necessary changes to the browser DOM.",
        details:
            "After React has finished calculating the next UI, it commits the required changes to the real DOM. This is when DOM mutations happen and the browser can reflect the updated UI.",
    },
    {
        id: "hydration",
        title: "Hydration",
        summary:
            "Hydration connects React behavior to HTML that already exists before React runs.",
        details:
            "Hydration applies when HTML was already generated before React runs, usually through server-side rendering or static generation. The browser displays the existing HTML first. React then loads and attaches event handlers and component behavior to that existing HTML, normally using hydrateRoot(). A normal client-side Vite React app using createRoot() is rendering, not hydrating. Roman Urdu: Hydration tab hoti hai jab HTML pehle se server ya static generation se browser mein aa chuki ho. Page ka content nazar aa raha hota hai, lekin React ki JavaScript load hone ke baad React us existing HTML ke saath event handlers aur component behavior connect karta hai. Is process ko hydration kehte hain.",
    },
];