export default function Loading() {
  return (
    <body className="container-fluid center" style={{ height: "100vh" }}>
      <p aria-busy="true" aria-label="Loading…" className="contrast">
        Loading
      </p>
    </body>
  )
}
