import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TaskRow from "./TaskRow";
import { getUser } from "@/actions/auth";

const TasksTable = async ({ tasks }: { tasks: TaskProps[] }) => {
  const user = await getUser();
  return (
    <Table>
      <TableCaption>A list of your recent projects.</TableCaption>
      <TableHeader>
        <TableRow>
          {/* <TableHead>Dodeljeno od</TableHead> */}
          <TableHead>Izvajalec</TableHead>
          <TableHead>Začetek</TableHead>
          <TableHead>Rok</TableHead>
          <TableHead>Prioriteta</TableHead>
          <TableHead>Naziv naloge</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks?.map((task) => {
          return <TaskRow key={task.id} task={task} user={user} />;
        })}
      </TableBody>
    </Table>
  );
};

export default TasksTable;
