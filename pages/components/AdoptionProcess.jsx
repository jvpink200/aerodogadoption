import Image from "next/image";
import { processes } from "../constants";
export default function AdoptionProcess() {
  return (
    <section className="adoption">
      <p className="title">Our Recommended Dog Adoption Process</p>
      <div className="steps">
        {processes.map((process) => {
          return (
            <div key={process.step} className="process">
              <Image
                width={200}
                height={200}
                src={`/${process.img}`}
                alt={process.text}
                className="img"
                quality={100}
              />
              <p className="subTitle">{process.subTitle}</p>
              <p className="text">{process.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
