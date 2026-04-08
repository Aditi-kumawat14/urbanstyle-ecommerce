import HeroBanner from "@/components/HeroBanner.jsx";
import ProductCard from "@/components/ProductCard.jsx";
import { products } from "@/data/products.js";

const Index = () => {
  const hoodies = products.filter((p) => p.category === "hoodies");
  const tees = products.filter((p) => p.category === "tees");

  return (
    <div>
      <HeroBanner />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <section>
            <h2 className="mb-6 text-lg font-semibold text-foreground">Oversized Hoodies</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {hoodies.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-lg font-semibold text-foreground">Streetwear Tees</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {tees.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;
