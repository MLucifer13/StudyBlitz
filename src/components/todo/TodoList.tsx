import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2, Edit, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Priority = "high" | "medium" | "low";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
}

interface TodoListProps {
  todos?: TodoItem[];
  onAddTodo?: (todo: Omit<TodoItem, "id" | "createdAt">) => void;
  onToggleTodo?: (id: string) => void;
  onDeleteTodo?: (id: string) => void;
  onEditTodo?: (id: string, text: string, priority: Priority) => void;
}

const priorityColors = {
  high: "text-pink-500 border-pink-500 bg-pink-500/10 hover:bg-pink-500/20",
  medium: "text-blue-500 border-blue-500 bg-blue-500/10 hover:bg-blue-500/20",
  low: "text-purple-500 border-purple-500 bg-purple-500/10 hover:bg-purple-500/20",
};

const priorityGlow = {
  high: "shadow-[0_0_15px_rgba(236,72,153,0.5)]",
  medium: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
  low: "shadow-[0_0_15px_rgba(168,85,247,0.5)]",
};

const TodoList = ({
  todos = [
    {
      id: "1",
      text: "Complete math assignment",
      completed: false,
      priority: "high" as Priority,
      createdAt: new Date(),
    },
    {
      id: "2",
      text: "Read chapter 5 for literature",
      completed: true,
      priority: "medium" as Priority,
      createdAt: new Date(),
    },
    {
      id: "3",
      text: "Schedule study group meeting",
      completed: false,
      priority: "low" as Priority,
      createdAt: new Date(),
    },
  ],
  onAddTodo = () => {},
  onToggleTodo = () => {},
  onDeleteTodo = () => {},
  onEditTodo = () => {},
}: TodoListProps) => {
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState<Priority>("medium");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editPriority, setEditPriority] = useState<Priority>("medium");

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      onAddTodo({
        text: newTodoText,
        completed: false,
        priority: newTodoPriority,
      });
      setNewTodoText("");
      setNewTodoPriority("medium");
    }
  };

  const startEditing = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditPriority(todo.priority);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = (id: string) => {
    if (editText.trim()) {
      onEditTodo(id, editText, editPriority);
      setEditingId(null);
    }
  };

  // For local state management when no external handlers are provided
  const [localTodos, setLocalTodos] = useState<TodoItem[]>(todos);

  const handleToggle = (id: string) => {
    if (onToggleTodo) {
      onToggleTodo(id);
    } else {
      setLocalTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    }
  };

  const handleDelete = (id: string) => {
    if (onDeleteTodo) {
      onDeleteTodo(id);
    } else {
      setLocalTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  const handleEdit = (id: string, text: string, priority: Priority) => {
    if (onEditTodo) {
      onEditTodo(id, text, priority);
    } else {
      setLocalTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, text, priority } : todo,
        ),
      );
    }
  };

  const displayTodos = onToggleTodo ? todos : localTodos;

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-black border border-gray-800 rounded-lg shadow-lg">
      <CardHeader className="border-b border-gray-800 bg-gray-900/50">
        <CardTitle className="text-2xl font-bold text-center text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500">
            Task Manager
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            className="flex-1 bg-gray-900 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          />
          <div className="flex space-x-1">
            {["low", "medium", "high"].map((priority) => (
              <Button
                key={priority}
                type="button"
                variant="outline"
                size="icon"
                className={cn(
                  "w-8 h-8 rounded-full border-2",
                  priorityColors[priority as Priority],
                  newTodoPriority === priority &&
                    priorityGlow[priority as Priority],
                )}
                onClick={() => setNewTodoPriority(priority as Priority)}
              />
            ))}
          </div>
          <Button
            type="button"
            onClick={handleAddTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          >
            <PlusCircle className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          <AnimatePresence>
            {displayTodos.map((todo) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "p-3 rounded-lg border-2 flex items-center justify-between gap-2 bg-gray-900/80",
                  priorityColors[todo.priority],
                  priorityGlow[todo.priority],
                )}
              >
                {editingId === todo.id ? (
                  <div className="flex flex-col w-full space-y-2">
                    <Input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      autoFocus
                    />
                    <div className="flex justify-between">
                      <div className="flex space-x-1">
                        {["low", "medium", "high"].map((priority) => (
                          <Button
                            key={priority}
                            type="button"
                            variant="outline"
                            size="icon"
                            className={cn(
                              "w-6 h-6 rounded-full border-2",
                              priorityColors[priority as Priority],
                              editPriority === priority &&
                                priorityGlow[priority as Priority],
                            )}
                            onClick={() =>
                              setEditPriority(priority as Priority)
                            }
                          />
                        ))}
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => saveEdit(todo.id)}
                          className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={cancelEditing}
                          className="text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => handleToggle(todo.id)}
                        className={cn(
                          "border-2",
                          priorityColors[todo.priority],
                          todo.completed && "bg-gray-700 opacity-60",
                        )}
                      />
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            "text-sm font-medium",
                            todo.completed && "line-through text-gray-500",
                          )}
                        >
                          {todo.text}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs w-fit",
                            priorityColors[todo.priority],
                          )}
                        >
                          {todo.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => startEditing(todo)}
                        className="text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(todo.id)}
                        className="text-pink-500 hover:text-pink-400 hover:bg-pink-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {displayTodos.length === 0 && (
            <div className="p-4 text-center text-gray-500 border border-dashed border-gray-700 rounded-lg">
              <p>No tasks yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
