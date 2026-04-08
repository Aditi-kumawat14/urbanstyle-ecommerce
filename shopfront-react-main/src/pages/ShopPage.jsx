import { useState } from "react";
import ProductCard from "@/components/ProductCard.jsx";
import { products } from "@/data/products.js";

const categories = ["all", "hoodies", "tees", "bottoms"];

const ShopPage = () => {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-foreground">Shop All</h1>

      <div className="mb-8 flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              active === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
