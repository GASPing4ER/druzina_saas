"use client";

import { TableCell, TableRow } from "../ui/table";
import { OfferProps } from "@/types";

type OfferRowProps = {
  offer: OfferProps;
};

const OfferRow = ({ offer }: OfferRowProps) => {
  return (
    <>
      <TableRow className="cursor-pointer">
        <TableCell>{offer.offerer_id}</TableCell>
        <TableCell>{offer.quantity}</TableCell>
        <TableCell>{offer.price}</TableCell>
        <TableCell>{offer.total}</TableCell>
      </TableRow>
    </>
  );
};

export default OfferRow;
