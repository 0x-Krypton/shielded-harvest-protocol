import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FarmPools from "@/components/FarmPools";

const Farm = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-20 pb-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 glow-text">Private Farming</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stake your assets in encrypted farming strategies while keeping your competitive edge protected
            </p>
          </div>
        </section>
        <FarmPools />
      </main>
    </div>
  );
};

export default Farm;