export const learningConcepts = [
    {
        id: "client-side-routing",
        title: "Client-Side Routing",
        summary:
            "React Router changes the visible route without replacing the whole HTML document.",
        projectUsage:
            "The app feels like multiple pages while still using one index.html and one React root.",
    },
    {
        id: "browser-router",
        title: "BrowserRouter",
        summary:
            "Provides routing context and uses the browser History API for clean URLs.",
        projectUsage:
            "main.jsx wraps App once with BrowserRouter so route components can use router features.",
    },
    {
        id: "link",
        title: "Link",
        summary:
            "Performs internal client-side navigation while preserving link semantics.",
        projectUsage:
            "Course cards and page links use Link instead of internal anchor tags.",
    },
    {
        id: "navlink",
        title: "NavLink",
        summary:
            "Works like Link, but also exposes active route state.",
        projectUsage:
            "The main navigation uses NavLink for active styling and aria-current behavior.",
    },
    {
        id: "layout-routes",
        title: "Layout Routes",
        summary:
            "A parent route can render shared structure around matched child routes.",
        projectUsage:
            "AppLayout keeps the header, route inspector, and footer shared across pages.",
    },
    {
        id: "outlet",
        title: "Outlet",
        summary:
            "Marks where the matched child route should render inside a layout route.",
        projectUsage:
            "AppLayout and ProfileLayout both render Outlet for their child routes.",
    },
    {
        id: "dynamic-parameters",
        title: "Dynamic Parameters",
        summary:
            "URL segments like :courseId capture route values as strings.",
        projectUsage:
            "CourseDetailsPage reads courseId with useParams and looks up the matching course.",
    },
    {
        id: "use-navigate",
        title: "useNavigate",
        summary:
            "Performs programmatic navigation after actions or app logic.",
        projectUsage:
            "Buttons use navigate() for course inquiry flows, form submit redirects, and back navigation.",
    },
    {
        id: "use-location",
        title: "useLocation",
        summary:
            "Returns read-only information about the current route.",
        projectUsage:
            "RouteInspector displays pathname, search, hash, and navigation state.",
    },
    {
        id: "spa-deployment-fallback",
        title: "SPA Deployment Fallback",
        summary:
            "BrowserRouter apps need the server to return index.html for app routes.",
        projectUsage:
            "The README explains why direct visits to nested routes need production fallback support.",
    },
];