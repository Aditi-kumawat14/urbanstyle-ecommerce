import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext.jsx";
import { useWishlist } from "@/context/WishlistContext.jsx";

const HeartIcon = ({ className, filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, product.sizes[1] || product.sizes[0]);
    alert(`${product.name} added to cart!`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-md bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={600}
          height={700}
          className="aspect-[6/7] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 rounded-full bg-background/80 p-1.5 backdrop-blur transition-colors hover:bg-background"
        >
          <HeartIcon className={`h-4 w-4 ${wishlisted ? "text-primary" : "text-foreground"}`} filled={wishlisted} />
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
        <p className="text-sm font-semibold text-foreground">₹{product.price.toLocaleString()}</p>
        <button
          onClick={handleAddToCart}
          className="mt-2 rounded bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
