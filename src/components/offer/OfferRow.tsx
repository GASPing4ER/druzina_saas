"use client";

import { ControllerRenderProps } from "react-hook-form";
import { TableCell, TableRow } from "../ui/table";
import { OfferWithOffererProps } from "@/types";
import { CheckIcon } from "lucide-react";

type OfferRowProps = {
  offer: OfferWithOffererProps;
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
};

const OfferRow = ({ offer, field }: OfferRowProps) => {
  return (
    <TableRow
      onClick={() => field.onChange(offer.id)}
      className={`cursor-pointer ${
        field.value === offer.id
          ? "bg-green-300 border-2 border-green-700 rounded-md"
          : ""
      } cursor-pointer`}
    >
      <TableCell>{offer.offerer.name}</TableCell>
      <TableCell>{offer.quantity}</TableCell>
      <TableCell>{offer.price}€</TableCell>
      <TableCell>{offer.total}€</TableCell>
      <TableCell>
        <div className="h-5 w-5 rounded-full border border-black flex items-center justify-center">
          {field.value === offer.id ? <CheckIcon /> : null}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OfferRow;
