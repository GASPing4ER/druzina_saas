"use client";

import Link from "next/link";
import { TableCell, TableRow } from "./ui/table";
import { formatDate } from "@/utils";
import { FileProps } from "@/types";

type FileRowProps = {
  file: FileProps;
};

const FileRow = ({ file }: FileRowProps) => {
  return (
    <>
      <TableRow className="cursor-pointer">
        <TableCell>{file.name}</TableCell>
        <TableCell>{file.description}</TableCell>
        <TableCell>
          <Link className="text-blue-500" href={file.link}>
            {file.link}
          </Link>
        </TableCell>
        <TableCell>{formatDate(file.created_at)}</TableCell>
      </TableRow>
    </>
  );
};

export default FileRow;
