import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { OfferRow } from "@/components";
import { OfferProps } from "@/types";

type OfferTableProps = {
  offers: OfferProps[];
};

const OfferTable = async ({ offers }: OfferTableProps) => {
  return (
    <Table className="flex-1">
      <TableHeader>
        <TableRow>
          <TableHead>Ime</TableHead>
          <TableHead>Št. izvodov</TableHead>
          <TableHead>Cena/količina</TableHead>
          <TableHead>Skupaj</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {offers?.map((offer) => {
          return <OfferRow key={offer.id} offer={offer} />;
        })}
      </TableBody>
    </Table>
  );
};

export default OfferTable;
