"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OfferRow } from "@/components";
import { OfferWithOffererProps } from "@/types";
import { ControllerRenderProps } from "react-hook-form";

type OfferTableProps = {
  projectId: string;
  field: ControllerRenderProps<
    {
      start_date?: Date | undefined;
      end_date?: Date | undefined;
      oblikovanje?: string | undefined;
      sken?: string | undefined;
      postavitev?: string | undefined;
      predogled?: boolean | undefined;
      potrditev_postavitve?: boolean | undefined;
      navodila?: string | undefined;
      prevzem?: boolean | undefined;
      ponudba_id?: string | undefined;
    },
    "ponudba_id"
  >;
  offers: OfferWithOffererProps[] | null;
};

const OfferTable = ({ offers, field }: OfferTableProps) => {
  return (
    <Table className="flex-1">
      <TableHeader>
        <TableRow>
          <TableHead>Ime</TableHead>
          <TableHead>Št. izvodov</TableHead>
          <TableHead>Cena na izvod</TableHead>
          <TableHead>Skupaj</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers?.map((offer) => {
          return <OfferRow key={offer.id} offer={offer} field={field} />;
        })}
      </TableBody>
    </Table>
  );
};

export default OfferTable;
