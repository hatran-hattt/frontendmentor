export default function Footer() {
  return (
    <footer className="my-12 text-center">
      <div>
        {"Challenge by "}
        <a
          className="underline text-(--cl-subtle-text)"
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
        >
          #Frontend Mentor
        </a>
        {". Coded by "}
        <a
          className="underline text-(--cl-subtle-text)"
          href="https://www.frontendmentor.io/profile/hatran-hattt"
          target="_blank"
        >
          #Ha
        </a>
        .
      </div>
    </footer>
  );
}