export default function PaymentModal({ setModal }: any) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("submitted")
  }
  return (
    <dialog open>
      <article>
        <header>
          <link
            onClick={() => setModal(false)}
            aria-label="Close"
            className="close"
          />
          <h1>Describe your Payment</h1>
        </header>
				<form onSubmit={handleSubmit}>
					<label >
						Contact Info
						<input type="text" />
					</label>
					<label>
						description:
            <textarea></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </article>
    </dialog>
  )
}
