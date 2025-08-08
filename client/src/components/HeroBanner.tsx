import Image from "next/image";
import bgImage from "../../public/bg-image.png";

export default function HeroBanner() {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-4 bg-gradient-to-b from-summit-light-gray/30 to-transparent">
      <div className="mx-auto max-w-[1250px]">
        <Image
          src={bgImage}
          alt="National Technovation Summit 2025"
          priority
          className="w-full h-auto object-cover object-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
      </div>
    </div>
  );
}
