import { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!newTask.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    onAddTask(newTask);
    setNewTask("");
    setError("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, backgroundColor: "#f1f8f6" }}>
      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        error={!!error}
        helperText={error}
      />
      <Button
        variant="contained"
        sx={{ mt: 2, width: "100%", backgroundColor: "#ff8282" }}
        startIcon={<AddCircle />}
        onClick={handleSubmit}
      >
        Add Task
      </Button>
    </Paper>
  );
};

export default TaskForm;
