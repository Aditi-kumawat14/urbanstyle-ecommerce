import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroBanner}
        alt="New Season Collection"
        width={1920}
        height={800}
        className="h-[400px] w-full object-cover sm:h-[500px]"
      />
      <div className="hero-gradient absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold uppercase tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            New Season
            <br />
            Collection
          </h1>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
