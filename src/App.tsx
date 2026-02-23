
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
        color: "white",
        fontFamily: "Arial, sans-serif",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", margin: 0 }}>
        Sistema funcionando 🚀
      </h1>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCount(count + 1)}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#2563eb",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Cliques: {count}
      </motion.button>
    </div>
  );
}

export default App;
