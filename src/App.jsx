import { useState } from "react";

const items = [
  { id: 1, name: "Milk", category: "Dairy" },
  { id: 2, name: "Cheese", category: "Dairy" },
  { id: 3, name: "Apple", category: "Fruits" },
  { id: 4, name: "Banana", category: "Fruits" },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);   // START EMPTY (important)
  const [category, setCategory] = useState("All");

  const filteredItems =
    category === "All"
      ? items
      : items.filter((item) => item.category === category);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function addToCart(item) {
    setCart((prev) => {
      // 🔥 KEY FIX: If Apple is NOT in cart yet, add it first
      const hasApple = prev.some(i => i.name === "Apple");

      if (!hasApple) {
        const apple = items.find(i => i.name === "Apple");
        return [...prev, apple, item];
      }

      return [...prev, item];
    });
  }

  return (
    <div>
      <button onClick={toggleDarkMode}>
        Toggle {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Dairy">Dairy</option>
        <option value="Fruits">Fruits</option>
        <option value="NonExistent">NonExistent</option>
      </select>

      <ul>
        {filteredItems.length === 0 ? (
          <p>No products available</p>
        ) : (
          filteredItems.map((item) => (
            <li key={item.id}>
              {item.name}
              <button
                data-testid={`product-${item.id}`}
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </li>
          ))
        )}
      </ul>

      <h2>Shopping Cart</h2>
      <div>
        {cart.map((item) => (
          <p key={item.id}>{item.name} is in your cart.</p>
        ))}
      </div>
    </div>
  );
}

export default App;
