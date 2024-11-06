import Image from "next/image";
import Particles from "./UI/Particles";

import Client01 from "@/public/images/client-01.svg";
import Client02 from "@/public/images/client-02.svg";
import Client03 from "@/public/images/client-03.svg";
import Client04 from "@/public/images/client-04.svg";
import Client05 from "@/public/images/client-05.svg";
import Client06 from "@/public/images/client-06.svg";
import Client07 from "@/public/images/client-07.svg";
import Client08 from "@/public/images/client-08.svg";
import Client09 from "@/public/images/client-09.svg";
import Client10 from "@/public/images/client-10.svg";
import Client11 from "@/public/images/client-11.svg";
import Client12 from "@/public/images/client-12.svg";
import Client13 from "@/public/images/client-13.svg";
import Client14 from "@/public/images/client-14.svg";

const logos = [
  { src: Client01, alt: "Client 01" },
  { src: Client02, alt: "Client 02" },
  { src: Client03, alt: "Client 03" },
  { src: Client04, alt: "Client 04" },
  { src: Client05, alt: "Client 05" },
  { src: Client06, alt: "Client 06" },
  { src: Client07, alt: "Client 07" },
  { src: Client08, alt: "Client 08" },
  { src: Client09, alt: "Client 09" },
  { src: Client10, alt: "Client 10" },
  { src: Client11, alt: "Client 11" },
  { src: Client12, alt: "Client 12" },
  { src: Client13, alt: "Client 13" },
  { src: Client14, alt: "Client 14" },
];

export default function Clients() {
  return (
    <section>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Particles animation */}
        <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6">
          <Particles className="absolute inset-0 -z-10" quantity={5} />
        </div>

        <div className="py-12 md:py-16">
          <div className="overflow-hidden">
            <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8">
                {logos.map((logo, index) => (
                  <li key={index}>
                    <Image src={logo.src} alt={logo.alt} />
                  </li>
                ))}
              </ul>
              <ul
                className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
                aria-hidden="true"
              >
                {logos.map((logo, index) => (
                  <li key={index}>
                    <Image src={logo.src} alt={logo.alt} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
