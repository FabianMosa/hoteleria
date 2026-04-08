import HomeHeroSection from "@/components/features/home/HomeHeroSection";

/**
 * Home: solo compone la feature; header y footer viven en `app/layout.js`.
 */
export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 text-zinc-950">
      <HomeHeroSection />
    </div>
  );
}
