import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { User } from "@supabase/supabase-js";
import {
  OfferWithOffererProps,
  ProjectPhaseProps,
  ProjectWithCreatorProps,
} from "@/types";
import { getProjectPhase } from "@/utils";
import {
  DeleteProjectDialog,
  DistribucijaForm,
  PripravOblikovanjeForm,
  TechicalSpecificationsForm,
  TiskForm,
  UrednistvoForm,
} from "@/components";

type PhaseSpecificationsProps = {
  user: User;
  project: ProjectWithCreatorProps;
  project_phases: ProjectPhaseProps[] | null;
  offers: OfferWithOffererProps[] | null;
};

const PhaseSpecifications = ({
  user,
  project,
  project_phases,
  offers,
}: PhaseSpecificationsProps) => {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <Accordion type="multiple" className="flex flex-col gap-2">
        <AccordionItem
          className="bg-gray-100 rounded-b-md"
          value="tehnicne-specifikacije"
        >
          <AccordionTrigger className="bg-gray-300 rounded-full px-4">
            TEHNIČNE SPECIFIKACIJE
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4">
            <TechicalSpecificationsForm user={user} project={project} />
          </AccordionContent>
        </AccordionItem>
        {project.type !== "drugo" && (
          <AccordionItem
            className="bg-gray-100 rounded-b-md"
            value="urednistvo"
          >
            <AccordionTrigger className="bg-gray-300 rounded-full px-4">
              UREDNIŠTVO
            </AccordionTrigger>
            <AccordionContent className="px-4 py-4">
              <UrednistvoForm
                user={user}
                project={project}
                project_phase={getProjectPhase(project_phases, "urednistvo")}
              />
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem
          className="bg-gray-100 rounded-b-md"
          value="priprava-in-oblikovanje"
        >
          <AccordionTrigger className="bg-gray-300 rounded-full px-4">
            PRIPRAVA IN OBLIKOVANJE
          </AccordionTrigger>
          <AccordionContent className="px-4 py-4">
            <PripravOblikovanjeForm
              user={user}
              project={project}
              project_phase={getProjectPhase(
                project_phases,
                "priprava-in-oblikovanje"
              )}
            />
          </AccordionContent>
        </AccordionItem>
        {project.is_for_tisk && (
          <>
            <AccordionItem className="bg-gray-100 rounded-b-md" value="tisk">
              <AccordionTrigger className="bg-gray-300 rounded-full px-4">
                TISK
              </AccordionTrigger>
              <AccordionContent className="px-4 py-4">
                <TiskForm
                  user={user}
                  project={project}
                  project_phases={project_phases}
                  offers={offers}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              className="bg-gray-100 rounded-b-md"
              value="distribucija"
            >
              <AccordionTrigger className="bg-gray-300 rounded-full px-4">
                DISTRIBUCIJA
              </AccordionTrigger>
              <AccordionContent className="px-4 py-4">
                <DistribucijaForm
                  user={user}
                  project={project}
                  project_phases={project_phases}
                />
              </AccordionContent>
            </AccordionItem>
          </>
        )}
      </Accordion>
      {user.id === project.creator_id && (
        <DeleteProjectDialog projectId={project.id} />
      )}
    </div>
  );
};

export default PhaseSpecifications;
