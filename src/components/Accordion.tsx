import { useState } from "react";
import Container from "./Container";
import { FaChevronDown } from "react-icons/fa";


interface TAccordion {
    title: string;
    explain: string;
}

const AccordionItems = ({ title, explain} : TAccordion) => {
  const [showContent, setShowContent] = useState(false);
    return (
        <div className="rounded-lg mb-5 px-4 py-2  bg-gray-100">
          <div
            className="flex cursor-pointer items-start justify-between text-primary"
            onClick={() => setShowContent((prev) => !prev)}
          >
            <h1 className="font-bold text-lg">
              {title}
            </h1>
            <FaChevronDown
              className={`${
                showContent ? "rotate-180" : ""
              } duration-300 ease-in min-w-max min-h-max md:text-xl text-base`}
            />
          </div>
          <p
            className={`text-sm overflow-hidden mt-5 duration-300 ease-linear ${
              showContent ? "h-[80px]" : "h-[0px]"
            }`}
          >
           {explain}
          </p>
        </div>
    )
}



interface IAccordion {
    items: TAccordion[]
}
export default function Accordion({ items }: IAccordion) {
  return (
    <Container className="md:mt-48 mt-24 md:w-[70%]w-[90%] lg:w-[60%] max-w-[1000px] mx-auto">
      {items?.map((faq) => (
        <AccordionItems title={faq?.title} explain={faq?.explain} key={faq?.title}/>
      ))}
    </Container>
  );
}
