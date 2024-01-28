import Container from "@/components/Container";
import RealTimeChat from "./RealTimeChat";
import Recording from "./Recording";

export default function Feature() {

  return (
    <Container className="md:mt-48 mt-24">
      <section className="grid md:gap-20 gap-10 h-auto md:grid-cols-2">
       <Recording />
       <RealTimeChat />
      </section>
    </Container>
  );
}
