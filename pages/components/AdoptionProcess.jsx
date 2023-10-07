import { processes } from "../constants";
import ProcessCard from "./ProcessCard";

export default function AdoptionProcess() {
  return (
    <section className="adoption">
      <p className="title">Our Recommended Dog Adoption Process</p>

      <div className="steps">
        {processes.map((process) => {
          return (
            <div key={process.step} className={`process ${process.cardNum}`}>
              <ProcessCard
                img={process.img}
                text={process.text}
                subTitle={process.subTitle}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
