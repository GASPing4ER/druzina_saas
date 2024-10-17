import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TaskRow from "./TaskRow";

const TasksTable = async ({ tasks }: { tasks: TaskProps[] }) => {
  return (
    <Table>
      <TableCaption>A list of your recent projects.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Dodeljeno od</TableHead>
          <TableHead>Izvajalec</TableHead>
          <TableHead>Začetek</TableHead>
          <TableHead>Rok</TableHead>
          <TableHead>Prioriteta</TableHead>
          <TableHead>Naziv naloge</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks?.map((task) => {
          return <TaskRow task={task} />;
        })}
      </TableBody>
    </Table>
  );
};

export default TasksTable;
