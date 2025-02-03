"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  AppBar,
  Toolbar,
} from "@mui/material";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function TaskListApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    taskId: string | null;
  }>({ open: false, taskId: null });

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((title: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }, []);

  const toggleTaskCompletion = useCallback((id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const confirmDeleteTask = useCallback((id: string) => {
    setDeleteConfirmation({ open: true, taskId: id });
  }, []);

  const deleteTask = useCallback(() => {
    if (deleteConfirmation.taskId) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== deleteConfirmation.taskId)
      );
    }
    setDeleteConfirmation({ open: false, taskId: null });
  }, [deleteConfirmation]);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) =>
        filter === "completed"
          ? task.completed
          : filter === "incomplete"
          ? !task.completed
          : true
      ),
    [tasks, filter]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f3633, #dcedc1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem 0",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          mt: 5,
          textAlign: "center",
          background: "#f5f7f5",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#0f3633" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
          </Toolbar>
        </AppBar>

        <TaskForm onAddTask={addTask} />

        <Box sx={{ mb: 2, mt: 3 }}>
          {["all", "completed", "incomplete"].map((value) => (
            <Button
              key={value}
              variant={filter === value ? "contained" : "outlined"}
              onClick={() => setFilter(value as any)}
              sx={{ mr: 1 }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Button>
          ))}
        </Box>

        {filteredTasks.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No tasks available
          </Typography>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTaskCompletion}
            onDelete={confirmDeleteTask}
          />
        )}

        <Dialog
          open={deleteConfirmation.open}
          onClose={() => setDeleteConfirmation({ open: false, taskId: null })}
        >
          <DialogTitle>Delete Task</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this task?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                setDeleteConfirmation({ open: false, taskId: null })
              }
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={deleteTask} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
