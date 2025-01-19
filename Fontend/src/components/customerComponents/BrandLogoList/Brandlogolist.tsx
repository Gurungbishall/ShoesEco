import nike from "../../pictures/Icon/294668_nike_icon.png";
import adidas from "../../pictures/Icon/9056731_adidas_icon.png";

export default function BrandLogoList() {
  function Image({ src, alt }: { src: string; alt: string }) {
    return (
      <>
        <div className="flex flex-col justify-center items-center gap-2 cursor-pointer">
          <img
            className="p-2 size-14 bg-stone-400 border-2 rounded-full"
            src={src}
            alt={alt}
          />
          <span className="font-bold">{alt}</span>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        <Image src={nike} alt="Nike" />
        <Image src={adidas} alt="Adidas" />
        <Image src={nike} alt="Nike" />
        <Image src={adidas} alt="Adidas" />
        <Image src={nike} alt="Nike" />
        <Image src={adidas} alt="Adidas" />
        <Image src={nike} alt="Nike" />
        <div className="flex flex-col justify-center items-center gap-2">
          <i className="fa-solid fa-bars-staggered size-14 bg-stone-400 border-2 rounded-full text-center pt-4" />
          <span className="font-bold">More ..</span>
        </div>
      </div>
    </>
  );
}
