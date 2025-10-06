export default function Info({title, content}: {title: string, content: string}) {
  return (
    <p className="text-(length:--step--1)">
      <span className="font-semibold">{title}</span>
      <span className="font-light">{content}</span>
    </p>
  )
}