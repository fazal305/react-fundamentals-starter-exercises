function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-300 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-5 text-sm leading-6 text-slate-600">
        <p>&copy; {currentYear} React Router Learning Hub</p>
        <p className="mt-2">
          Internal app navigation uses React Router's{" "}
          <code className="font-mono">Link</code> and{" "}
          <code className="font-mono">NavLink</code>. External destinations use
          normal anchors, like{" "}
          <a
            href="https://reactrouter.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-blue-700 underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            React Router Documentation
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
