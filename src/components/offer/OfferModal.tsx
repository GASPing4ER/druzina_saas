import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { OfferForm } from "@/components";

type OfferModalProps = {
  projectId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const OfferModal = ({ projectId, open, setOpen }: OfferModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj ponudbo</DialogTitle>
          <DialogDescription className="text-black flex flex-col gap-2 p-2">
            Dobrodošli v obrazcu za dodajanje ponudb
          </DialogDescription>
        </DialogHeader>
        <OfferForm projectId={projectId} handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default OfferModal;
