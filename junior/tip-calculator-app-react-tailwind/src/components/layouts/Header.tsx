import logo from "../../assets/images/logo.svg";

export default function Header() {
  return (
    <header className="flex justify-center items-center p-(--space-2xl)">
      <h1 className="sr-only">SPLITTER</h1>
      <img alt="Logo" src={logo} />
    </header>
  );
}
