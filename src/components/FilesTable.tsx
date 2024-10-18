import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FileRow } from "@/components";

const FilesTable = async ({ files }: { files: FileProps[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Naslov</TableHead>
          <TableHead>Opis</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Datum</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files?.map((file) => {
          return <FileRow key={file.id} file={file} />;
        })}
      </TableBody>
    </Table>
  );
};

export default FilesTable;
