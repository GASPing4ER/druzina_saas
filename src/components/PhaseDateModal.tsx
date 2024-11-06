import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PhaseDateForm } from "@/components";
import { CompleteProjectPhaseProps } from "@/types";

type PhaseDateModalProps = {
  isOpen: boolean;
  project: CompleteProjectPhaseProps;
};

const PhaseDateModal = ({ isOpen, project }: PhaseDateModalProps) => {
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Določitev trajanja faze</DialogTitle>
            <DialogDescription>
              Dobrodošli v obrazcu za določitev trajanja faze.
            </DialogDescription>
          </DialogHeader>
          <PhaseDateForm project={project} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhaseDateModal;
