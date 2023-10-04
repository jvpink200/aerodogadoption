import HeroBanner from "../components/HeroBanner";
import Services from "../components/Services";
import About from "../components/About";
export default function Main() {
  return (
    <main className="main">
      <HeroBanner />
      <Services />
      <About />
      <Services />
      <Services />
    </main>
  );
}
