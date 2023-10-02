import NavBar from "../../components/NavBar"

export default function RootPayment() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("submitted")
  }
  return (
    <div className="container">
      <NavBar />
      <div>
        <article>
          <h1>Payment</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Selected Package
              <select required>
                <option value="single" selected>
                  single room
                </option>
                <option value="double">double room</option>
                <option value="shared">shared room</option>
              </select>
            </label>
            <label>
              Pick payment Method
              <select required>
                <option value="cash" selected>
                  Cash
                </option>
                <option value="bikash">Bikash</option>
              </select>
            </label>
            <label htmlFor="">
              Comment
              <textarea placeholder="comment" />
            </label>
            <button>Submit</button>
          </form>
        </article>
        <article>
          <div>
            <div>
              <h4>Invoice Amount </h4>
              <table>
                <tr>
                  <th></th>
                  <th>
                    <strong>Price</strong>
                  </th>
                </tr>
                <tr>
                  <td>single room</td>
                  <td>৳5000</td>
                </tr>
                <tr>
                  <td>default charge</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>tax</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>৳5000</td>
                </tr>
              </table>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
