import { getUser } from "@/actions/auth";
import { PhaseRow } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompleteProjectPhaseProps } from "@/types";

type PhaseTableProps = {
  projects: CompleteProjectPhaseProps[];
  phase?: string;
};

const PhaseTable = async ({ projects, phase }: PhaseTableProps) => {
  const user = await getUser();
  const role = user.user_metadata.role;

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
          <TableHead>Status</TableHead>
          <TableHead>Napredek</TableHead>
          <TableHead>Stanje</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects?.map((project) => {
          let pathname: string;
          const path = phase
            ? `${phase}`
            : role === "member"
            ? `${project.name}`
            : "projekti";
          if (project.id) {
            pathname = `/${path}/${project.project_data.id}`;
          } else {
            pathname = `/${path}`;
          }
          return (
            <PhaseRow key={project.id} project={project} pathname={pathname} />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PhaseTable;
