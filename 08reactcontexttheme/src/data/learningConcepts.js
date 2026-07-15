export const learningConcepts = [
  {
    id: "prop-drilling",
    title: "Prop Drilling",
    summary:
      "Passing data through intermediate components only so a deeper child can use it.",
    projectUsage:
      "The comparison section shows how repetitive theme prop forwarding can become.",
  },
  {
    id: "context-api",
    title: "Context API",
    summary:
      "A React feature for sharing values with descendants through a provider.",
    projectUsage:
      "ThemeProvider exposes theme state and actions to nested components.",
  },
  {
    id: "create-context",
    title: "createContext",
    summary:
      "Creates the context object that identifies a shared value channel.",
    projectUsage:
      "ThemeContext is created separately from provider state and side effects.",
  },
  {
    id: "provider",
    title: "Provider",
    summary:
      "Makes a context value available to descendants rendered inside it.",
    projectUsage:
      "ThemeProvider wraps App in main.jsx and owns the live theme value.",
  },
  {
    id: "use-context",
    title: "useContext",
    summary:
      "Reads the nearest matching provider value above the component in the tree.",
    projectUsage:
      "useTheme calls useContext internally and returns the current theme API.",
  },
  {
    id: "custom-context-hook",
    title: "Custom Context Hook",
    summary:
      "A small hook that gives one consistent and safe way to read context.",
    projectUsage:
      "useTheme hides direct context access and throws a clear provider error.",
  },
  {
    id: "controlled-checkbox",
    title: "Controlled Checkbox",
    summary:
      "A checkbox is controlled with checked and onChange, not value alone.",
    projectUsage:
      "ThemeToggle reflects isDarkMode and calls toggleTheme when changed.",
  },
  {
    id: "tailwind-dark-variant",
    title: "Tailwind Dark Variant",
    summary:
      "Tailwind v4 can define a custom dark variant in CSS with @custom-variant.",
    projectUsage:
      "dark: utilities respond when ThemeProvider applies .dark to html.",
  },
  {
    id: "localstorage-persistence",
    title: "localStorage Persistence",
    summary:
      "localStorage can remember simple preferences across page reloads.",
    projectUsage:
      "The selected theme is loaded lazily and saved whenever it changes.",
  },
  {
    id: "context-versus-props",
    title: "Context versus Props",
    summary:
      "Props configure direct children; context shares values across distant descendants.",
    projectUsage:
      "Product data still uses props, while global theme state uses context.",
  },
];
