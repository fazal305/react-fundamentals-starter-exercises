export const cards = [
    {
        id: "react-props",
        title: "React Props",
        description:
            "Props send data from a parent component to a child component. They are read-only inside the child.",
        category: "Components",
        tags: ["strings", "arrays", "objects", "callbacks"],
        metadata: {
            level: "Beginner",
            focus: "Data flow",
            example: "title, tags, featured, onAction",
        },
        featured: true,
    },
    {
        id: "reconciliation",
        title: "Reconciliation",
        description:
            "Reconciliation is React's process for comparing the previous rendered tree with the next rendered tree.",
        category: "Rendering",
        tags: ["keys", "props", "state", "identity"],
        metadata: {
            level: "Core",
            focus: "Efficient DOM updates",
            example: "stable item IDs",
        },
        featured: true,
    },
    {
        id: "react-fiber",
        title: "React Fiber",
        description:
            "Fiber is React's internal architecture for organizing, scheduling, and committing rendering work.",
        category: "Internals",
        tags: ["render phase", "commit phase", "scheduling"],
        metadata: {
            level: "Conceptual",
            focus: "Rendering architecture",
            example: "work can be split into units",
        },
        featured: false,
    },
];