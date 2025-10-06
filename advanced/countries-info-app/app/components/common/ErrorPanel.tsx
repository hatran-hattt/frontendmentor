export default function ErrorPanel({msg}: {msg?: string}) {
  return (
    <div>
      <h2>Error happended!</h2>
      <p>Detail: {msg ?? "Unknown Error"}</p>
    </div>
  )
}