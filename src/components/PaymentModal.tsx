export default function PaymentModal({ setModal }: any) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("submitted")
  }
  
  return (
    <dialog open>
      <article>
        <button
          onClick={() => setModal(false)}
          aria-label="Close"
          className="close outline secondary"
        />
        <h1>Payment Info</h1>
        <table>
          <thead>
            <tr>
              <th>
                <strong>Selected Package</strong>
              </th>
              <th>
                <strong>Price</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Double Room</td>
              <td>12,000tk</td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={handleSubmit}>
          <label>
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
