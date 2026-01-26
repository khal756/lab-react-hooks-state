import { useState } from "react";

const items = [
  { id: 1, name: "Milk", category: "Dairy" },
  { id: 2, name: "Cheese", category: "Dairy" },
  { id: 3, name: "Apple", category: "Fruits" },
  { id: 4, name: "Banana", category: "Fruits" },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");

  const filteredItems =
    category === "All"
      ? items
      : items.filter((item) => item.category === category);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function addToCart(item) {
    setCart([...cart, item]);
  }

  return (
    <div>
      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode}>
        Toggle {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Category Filter */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Dairy">Dairy</option>
        <option value="Fruits">Fruits</option>
        <option value="NonExistent">NonExistent</option>
      </select>

      {/* Products */}
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

      {/* Shopping Cart */}
      <h2>Shopping Cart</h2>
      <div>
        {cart.map((item, index) => (
          <p key={index}>{item.name} is in your cart.</p>
        ))}
      </div>
    </div>
  );
}

export default App;
