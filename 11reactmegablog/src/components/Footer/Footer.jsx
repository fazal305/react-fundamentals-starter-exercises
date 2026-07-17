import Container from "../Container/Container";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="flex flex-col gap-3 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <p>Built with React, Redux Toolkit, Appwrite, and Tailwind CSS.</p>
      </Container>
    </footer>
  );
}

export default Footer;
