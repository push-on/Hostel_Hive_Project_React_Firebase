import Footer from "../../components/Footer"
import NavBar from "../../components/NavBar"
import { motion } from "framer-motion"

export default function RootFoods() {
  const foodOptions = [
    {
      id: 1,
      name: "Regular Bangladeshi Meal Plan",
      description: "Traditional Bangladeshi meals",
      price: "৳2000 per month",
    },
    {
      id: 2,
      name: "Vegetarian Meal Plan",
      description: "Vegetarian dishes for every meal",
      price: "৳1800 per month",
    },
    {
      id: 3,
      name: "Custom Meal Plan",
      description: "Choose your own meals",
      price: "Price varies",
    },
  ]

  return (
    <div className="container">
      <NavBar />

      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: "0vw", opacity: 1 }}
        exit={{ x: "-100vw", opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}>
        <article>
          <header>
            <h1 style={{ textAlign: "center" }}>MONTHLY FOOD SUBSCRIPTION</h1>
          </header>
          <article className="grid">
            {foodOptions.map((option) => (
              <div key={option.id}>
                <h2>{option.name}</h2>
                <p>{option.description}</p>
                <p>Price: {option.price}</p>
                <button>select</button>
              </div>
            ))}
          </article>

          <footer>
            <button>Subscribe</button>
          </footer>
        </article>
      </motion.div>
      <Footer />
    </div>
  )
}
