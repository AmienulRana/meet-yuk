import Button from "@/components/Button";
import Container from "@/components/Container";
import useJoinModal from "@/hooks/useJoinRoomModal";
import Image from "next/image";
import HeroImage from "./HeroImage";

export default function Invitation(){
  const { onOpen: openJoinModal } = useJoinModal();

    return (
        <Container className="md:mt-24 mt-16 text-center flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-primary" data-aos="fade-up">
          Try callyuk today
        </h2>
        <p
          className="mt-5 md:w-[60%] mx-auto"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          With our advanced modern technology, your meetings are not just
          recorded - they&apos;re transformed into valuable insight and
          productivity boosters.
        </p>
        <Button
          data-aos="fade-up"
          data-aos-duration="800"
          onClick={openJoinModal}
          size="small"
          variant="background"
          className="my-5 px-7"
        >
          Start Now
        </Button>
        <div className="my-10 relative">
          <Image
            src={"/dots.svg"}
            width={100}
            height={100}
            alt="dots svg"
            className="absolute -top-8 md:-right-8 right-0 -z-10"
            data-aos="fade-up"
          />
          <HeroImage />
          <Image
            src={"/dots.svg"}
            width={100}
            height={100}
            alt="dots svg"
            className="absolute -bottom-8 -left-8 -z-10"
          />
        </div>
      </Container>
    )
}