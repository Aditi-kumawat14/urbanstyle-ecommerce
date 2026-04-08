import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "@/data/products.js";
import { useCart } from "@/context/CartContext.jsx";
import { useWishlist } from "@/context/WishlistContext.jsx";

const HeartIcon = ({ className, filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "M");

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold text-foreground">Product not found</h2>
        <Link to="/shop" className="mt-4 inline-block text-sm text-muted-foreground underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    alert(`${product.name} (${selectedSize}) added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/shop" className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← Back to Shop
      </Link>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            width={600}
            height={700}
            className="aspect-[6/7] w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
            <p className="mt-1 text-xl font-semibold text-foreground">₹{product.price.toLocaleString()}</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-foreground">Size:</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded border px-4 py-1.5 text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 rounded bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                if (wishlisted) removeFromWishlist(product.id);
                else addToWishlist(product);
              }}
              className="rounded border border-border p-2.5 transition-colors hover:bg-secondary"
            >
              <HeartIcon className={`h-5 w-5 ${wishlisted ? "text-primary" : "text-foreground"}`} filled={wishlisted} />
            </button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Description</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
