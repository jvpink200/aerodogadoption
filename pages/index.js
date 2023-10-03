import NavBar from "./components/NavBar";
import Content from "./components/Content";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="grid">
      <NavBar />
      <Content />
      <Footer />
    </div>
  );
}
