import { services } from "../components/constants";

import Image from "next/image";
export default function Services() {
  return (
    <div className="services">
      {services.map((service, index) => {
        return (
          <div className="serviceCard" key={index}>
            <Image
              width={50}
              height={50}
              src={`/${service.icon}`}
              alt={service.text}
            />
            <p className="title">{service.title}</p>
            <p className="text">{service.text}</p>
          </div>
        );
      })}
    </div>
  );
}
