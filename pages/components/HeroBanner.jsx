import Image from "next/image";
import heroDog from "../images/heroDog.png";
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
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="bgText">
        <h1>Ready To Adopt?!</h1>
        <h2>Get Ready for PlayTime, Treats, Fun, & Lots of Cuddles!</h2>
        <button className="view-dogs btn">Show Me the Doggies!</button>
      </div>
    </section>
  );
}
