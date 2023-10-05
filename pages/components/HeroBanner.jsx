import Image from "next/image";
import heroDog from "../images/heroDog.png";
import Link from "next/link";
export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="bgImg">
        <Image
          className="heroImg"
          src={heroDog}
          alt="dog eating cereal"
          priority="true"
          layout="fill"
        />
      </div>
      <div className="bgText">
        <h1>Ready To Adopt?!</h1>
        <h2>Get Ready for PlayTime, Treats, Fun, & Lots of Cuddles!</h2>
        <button className="view-dogs btn">
          <Link href="/results">show me the doggies!</Link>
        </button>
      </div>
    </section>
  );
}
