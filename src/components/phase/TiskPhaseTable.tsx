import { TiskPhaseRow } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompleteProjectPhaseWithOffererProps } from "@/types";

type TiskPhaseTableProps = {
  projects: CompleteProjectPhaseWithOffererProps[];
};

const TiskPhaseTable = async ({ projects }: TiskPhaseTableProps) => {
  return (
    <Table>
      <TableCaption>A list of your recent projects.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Faza</TableHead>
          <TableHead>Naziv</TableHead>
          <TableHead>Vrsta</TableHead>
          <TableHead>Začetek</TableHead>
          <TableHead>Konec</TableHead>
          <TableHead>Vodja projekta</TableHead>
          <TableHead>Izvajalec</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects?.map((project) => (
          <TiskPhaseRow key={project.id} project={project} />
        ))}
      </TableBody>
    </Table>
  );
};

export default TiskPhaseTable;
