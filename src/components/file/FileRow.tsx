"use client";

import Link from "next/link";
import { TableCell, TableRow } from "../ui/table";
import { formatDate } from "@/utils";
import { FileProps } from "@/types";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { FileEditModal } from "@/components";

type FileRowProps = {
  file: FileProps;
};

const FileRow = ({ file }: FileRowProps) => {
  const [openForm, setOpenForm] = useState(false); // Manage dialog state
  return (
    <>
      <TableRow className="cursor-pointer">
        <TableCell>
          <Image
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              setOpenForm(true);
            }}
            src="/icons/edit.svg"
            alt="edit"
            width={25}
            height={25}
          />
        </TableCell>
        <TableCell>{file.name}</TableCell>
        <TableCell>{file.description}</TableCell>
        <TableCell>
          <Link className="text-blue-500" href={file.link}>
            {file.link}
          </Link>
        </TableCell>
        <TableCell>{formatDate(file.created_at)}</TableCell>
      </TableRow>
      <FileEditModal file={file} open={openForm} setOpen={setOpenForm} />
    </>
  );
};

export default FileRow;
