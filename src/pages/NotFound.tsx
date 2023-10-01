import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <article>
        <hgroup>
          <h1>404 NotFound</h1>
          <p>please check your url is correct or not</p>
        </hgroup>
        <footer>
          <button className="outline" onClick={() => navigate(-1)}>
            Go back
          </button>
        </footer>
      </article>
    </div>
  )
}
