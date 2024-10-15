import { ProjectRow } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";

const ProjectsTable = async ({ projects, phase }: ProjectsTableProps) => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const role = data.user?.user_metadata.role;

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
            ? phase
            : role === "member"
            ? project.current_phase
            : "projekti";
          if (project.id) {
            pathname = `/${path}/${project.id}`;
          } else {
            pathname = `/${path}`;
          }
          return (
            <ProjectRow
              key={project.id}
              project={project}
              pathname={pathname}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProjectsTable;
