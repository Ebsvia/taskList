import {
  Checkbox,
  ListItemText,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

interface TaskItemProps {
  task: { id: string; title: string; completed: boolean };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <Card
      sx={{ mb: 2, backgroundColor: task.completed ? "#cfe1cf" : "#ffffff" }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <ListItemText
            primary={task.title}
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              fontWeight: task.completed ? "bold" : "normal",
            }}
          />
        </div>
        <IconButton onClick={() => onDelete(task.id)} sx={{ color: "#d32f2f" }}>
          <Delete />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
