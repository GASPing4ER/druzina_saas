import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileProps } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { FileEditForm } from "@/components";

type FileEditModalProps = {
  file: FileProps;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const FileEditModal = ({ file, open, setOpen }: FileEditModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uredi nalogo</DialogTitle>
          <DialogDescription className="text-black flex flex-col gap-2 p-2">
            Dobrodošli v obrazcu za urejanje naloge
          </DialogDescription>
        </DialogHeader>
        <FileEditForm
          file={file}
          projectId={file.project_id}
          handleClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FileEditModal;
