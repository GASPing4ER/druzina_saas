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
          <TableHead></TableHead>
          <TableHead>Izvajalec</TableHead>
          <TableHead>Status</TableHead>
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
