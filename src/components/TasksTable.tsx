import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskRow } from "@/components";
import { getUser } from "@/actions/auth";
import { TaskWithNamesProps } from "@/types";

type TaskTableProps = {
  tasks: TaskWithNamesProps[];
};

const TasksTable = async ({ tasks }: TaskTableProps) => {
  const user = await getUser();
  return (
    <Table>
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
