import Container from "@/components/Container";
import Image from "next/image";

export default function CompanyUsage() {
  return (
    <Container className="md:mt-48 mt-24">
      <p className="text-center mb-4 text-gray-400" data-aos="fade-up">
        Used daily by more than{" "}
        <span className="font-bold text-primary">200+</span> Company
      </p>
      <div
        className="border gap-5 flex px-5 justify-between border-gray-300 rounded-md mx-auto lg:w-1/2 md:w-[80%] w-full overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <Image
          src={"/images/company/upwork.png"}
          height={80}
          width={80}
          alt="upwork"
          className="object-contain"
        />
        <Image
          src={"/images/company/microsoft.png"}
          height={80}
          width={80}
          alt="microsoft"
          className="object-contain"
        />
        <Image
          src={"/images/company/netflix.png"}
          height={80}
          width={80}
          alt="netflix"
          className="object-contain"
        />
        <Image
          src={"/images/company/slack.png"}
          height={80}
          width={80}
          alt="slack"
          className="object-contain"
        />
        <Image
          src={"/images/company/fiverr.png"}
          height={80}
          width={80}
          alt="fiverr"
          className="object-contain"
        />
      </div>
    </Container>
  );
}
