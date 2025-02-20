"use client";

import { useState } from "react";
import { ProjectRow } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectWithCreatorProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProjectsTableProps = {
  projects: ProjectWithCreatorProps[];
};

const ProjectsTable = ({ projects }: ProjectsTableProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Get unique types from the projects
  const uniqueTypes = Array.from(
    new Set(projects.map((project) => project.type))
  ).filter(Boolean);

  // Filter projects based on the selected type
  const filteredProjects =
    selectedType && selectedType !== "all"
      ? projects.filter((project) => project.type === selectedType)
      : projects;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Select
          onValueChange={(value) => setSelectedType(value)}
          defaultValue="all"
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter glede na vrsto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Vse vrste</SelectItem>
            {uniqueTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
            {/* <TableHead>Napredek</TableHead> */}
            {/* <TableHead>Stanje</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects?.map((project) => {
            let pathname: string;
            const path = "projekti";
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
    </div>
  );
};

export default ProjectsTable;
