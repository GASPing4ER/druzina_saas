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
  is_arhiv?: boolean;
};

const ProjectsTable = ({ projects, is_arhiv = false }: ProjectsTableProps) => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [query, setQuery] = useState("");

  // Get unique types from the projects
  const uniqueTypes = Array.from(
    new Set(projects.map((project) => project.type))
  ).filter(Boolean);

  // Filter projects based on the selected type
  const filteredProjects =
    query === "" && selectedType === "all"
      ? projects // Show all projects when both filters are at default values
      : projects.filter((project) => {
          let full_name;
          if (project.st_izdaje) {
            full_name = `${project.name} ${project.st_izdaje}`;
            console.log(full_name);
          }
          const matchesQuery =
            query === "" ||
            project.name.toLowerCase().includes(query.toLowerCase()) ||
            project.st_izdaje?.toLowerCase().includes(query.toLowerCase()) ||
            full_name?.toLowerCase().includes(query.toLowerCase());

          const matchesType =
            selectedType === "all" || project.type === selectedType;
          return matchesQuery && matchesType; // Apply both filters if necessary
        });

  return (
    <div className="w-full">
      <div className="flex w-full items-center mb-4">
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
        <input
          placeholder="Išči..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="placeholder:text-light-brown bg-transparent flex-1 max-w-[300px] border py-2 px-4 rounded-2xl"
        />
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
            let pathname = is_arhiv ? "arhiv" : "projekti";
            if (project.id) {
              pathname = `/${pathname}/${project.id}`;
            }
            return (
              <ProjectRow
                key={project.id}
                project={project}
                pathname={pathname}
                is_arhiv={is_arhiv}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
