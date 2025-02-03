import { List } from "@mui/material";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: { id: string; title: string; completed: boolean }[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  return (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
};

export default TaskList;
