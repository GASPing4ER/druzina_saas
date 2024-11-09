import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PhaseSpecifications = () => {
  return (
    <div className="flex-1">
      <Accordion type="multiple" className="flex flex-col gap-2">
        <AccordionItem
          className="bg-gray-100 rounded-full"
          value="tehnicne-specifikacije"
        >
          <AccordionTrigger className="bg-gray-300 rounded-full px-4">
            TEHNIČNE SPECIFIKACIJE
          </AccordionTrigger>
          <AccordionContent className="px-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="bg-gray-100 rounded-full" value="urednistvo">
          <AccordionTrigger className="bg-gray-300 rounded-full px-4">
            UREDNIŠTVO
          </AccordionTrigger>
          <AccordionContent className="px-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className="bg-gray-100 rounded-full"
          value="priprava-in-oblikovanje"
        >
          <AccordionTrigger className="bg-gray-300 rounded-full px-4">
            PRIPRAVA IN OBLIKOVANJE
          </AccordionTrigger>
          <AccordionContent className="px-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="bg-gray-100 rounded-full" value="tisk">
          <AccordionTrigger className="bg-gray-300 rounded-full px-4">
            TISK
          </AccordionTrigger>
          <AccordionContent className="px-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          className="bg-gray-100 rounded-full"
          value="distribucija"
        >
          <AccordionTrigger className="bg-gray-300 rounded-full px-4">
            DISTRIBUCIJA
          </AccordionTrigger>
          <AccordionContent className="px-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PhaseSpecifications;
