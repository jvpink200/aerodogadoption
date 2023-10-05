import HeroBanner from "../components/HeroBanner";
import Services from "../components/Services";
import About from "../components/About";
import AdoptionProcess from "./AdoptionProcess";
export default function Main() {
  return (
    <main className="main">
      <HeroBanner />
      <Services />
      <AdoptionProcess />
      <About />
    </main>
  );
}
