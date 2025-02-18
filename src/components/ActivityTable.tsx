import { convertActivityToText } from "@/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActivityWithCreatorProps } from "@/types";

export default function ActivityTable({
  activities,
}: {
  activities: ActivityWithCreatorProps[] | null;
}) {
  return (
    <ScrollArea className="w-full border rounded-lg">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead className="font-semibold text-left px-4 py-2">
              Aktivnosti
            </TableHead>
            <TableHead className="font-semibold text-left px-4 py-2">
              Datum
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities?.length ? (
            activities.map((activity) => (
              <TableRow
                key={activity.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <TableCell className="px-4 py-2">
                  {convertActivityToText(activity)}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-500">
                  {new Intl.DateTimeFormat("sl-SI", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(activity.created_at))}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                Ni aktivnosti za ta projekt.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
