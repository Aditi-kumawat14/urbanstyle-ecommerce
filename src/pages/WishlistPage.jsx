import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard.jsx";
import { useWishlist } from "@/context/WishlistContext.jsx";

const WishlistPage = () => {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold text-foreground">Your wishlist is empty</h2>
        <Link to="/shop" className="mt-4 inline-block rounded bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-foreground">Wishlist</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
