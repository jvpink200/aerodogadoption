import Image from "next/image";
export default function ProcessCard({ img, text, subTitle }) {
  return (
    <div className="processCard">
      <Image
        width={200}
        height={200}
        src={`/${img}`}
        alt={text}
        className="img"
        quality={100}
      />
      <p className="subTitle">{subTitle}</p>
      <span className="soon">Coming Soon!</span>
      <p className="text">{text}</p>
    </div>
  );
}
