import { ProgressBar } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, getPhaseName, isPast } from "@/utils";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

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
            <TableRow key={project.id}>
              <TableCell className="capitalize">
                <Link href={pathname} passHref>
                  {getPhaseName(project.current_phase)}
                </Link>
              </TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell className="capitalize">{project.type}</TableCell>
              <TableCell>{formatDate(project.start_date)}</TableCell>
              <TableCell
                className={`${isPast(project.end_date) && "text-red-500"}`}
              >
                {formatDate(project.end_date)}
              </TableCell>
              <TableCell>{project.creator_name}</TableCell>
              <TableCell
                className={`${
                  project.status === "v teku"
                    ? "bg-orange-300/40 text-orange-400"
                    : project.status === "v pripravi"
                    ? "bg-red-300/40 text-red-400"
                    : "bg-green-300/40 text-green-400"
                }`}
              >
                {project.status}
              </TableCell>
              <TableCell className="text-center">
                {project.napredek}/5
              </TableCell>
              <TableCell>
                <ProgressBar stanje={project.stanje} />
                {project.stanje}%
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ProjectsTable;
