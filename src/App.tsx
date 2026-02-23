import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "40px" }}>
      <h1>App funcionando 🚀</h1>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setCount(count + 1)}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Clique aqui: {count}
      </motion.button>
    </div>
  );
}

export default App;
