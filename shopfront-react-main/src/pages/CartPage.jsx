import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext.jsx";

const MinusIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

const PlusIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

const TrashIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
);

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-semibold text-foreground">Your cart is empty</h2>
        <Link to="/shop" className="mt-4 inline-block rounded bg-primary px-6 py-2 text-sm font-medium text-primary-foreground">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-foreground">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-4 rounded-lg border border-border p-4">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="h-16 w-16 rounded object-cover"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground truncate">{item.product.name}</h3>
              <p className="text-xs text-muted-foreground">Size: {item.size}</p>
            </div>
            <p className="text-sm font-semibold text-foreground whitespace-nowrap">
              ₹{(item.product.price * item.quantity).toLocaleString()}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded border border-border text-foreground hover:bg-secondary"
              >
                <MinusIcon className="h-3 w-3" />
              </button>
              <span className="w-6 text-center text-sm font-medium text-foreground">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded border border-border text-foreground hover:bg-secondary"
              >
                <PlusIcon className="h-3 w-3" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.product.id, item.size)}
              className="text-muted-foreground hover:text-destructive"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <span className="text-sm text-muted-foreground">Total:</span>
        <span className="text-2xl font-bold text-foreground">₹{totalPrice.toLocaleString()}</span>
      </div>

      <button
        onClick={() => alert("Checkout is a demo feature!")}
        className="mt-6 w-full rounded bg-primary py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartPage;
