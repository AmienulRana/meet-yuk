import Container from "@/components/Container";
import Image from "next/image";

export default function Review() {
  return (
    <section className="md:mt-48 mt-24 bg-[#ECF2FF] w-full py-20">
      <Container>
        <section className="md:flex">
          <Image
            src="/images/ceo.jpg"
            width={500}
            height={500}
            className="rounded-xl w-[520px] h-[400px]"
            alt="ceo image"
          />
          <div
            data-aos="fade-left"
            className="flex-1 mt-2 md:translate-y-8 -translate-y-12  px-5"
          >
            <div
              data-aos-duration="500"
              className="bg-white md:-translate-x-20  rounded-lg px-6 py-4"
            >
              <h2 className="md:text-4xl text-2xl leading-tight">
                &quot;CallYuk is an Application that is easy to use for
                meetings, I feel helped by this Application&quot;
              </h2>
            </div>
            <p className="mt-5 font-semibold">Brandon Jackson</p>
            <span className="text-gray-500 text-sm">CEO at RoomsResto</span>
          </div>
        </section>
      </Container>
    </section>
  );
}
