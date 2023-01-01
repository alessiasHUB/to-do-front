import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

export interface IToDo {
  task: string;
  completed: boolean;
  id: number;
  dueDate?: Date;
}

const url =
  process.env.NODE_ENV === "production"
    ? "https://to-do-back.onrender.com"
    : "http://localhost:4000";

export default function Main(): JSX.Element {
  const [toDoList, setToDoList] = useState<IToDo[]>([]);
  const [input, setInput] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>();
  // const [task, setTask] = useState<string>('');

  interface ToDoItemProps {
    todo: IToDo;
    handlePatch: (id: number, task: string, completed: boolean) => void;
    handleDeleteSelected: (id: number) => void;
  }

  const ToDoItem: React.FC<ToDoItemProps> = (props: ToDoItemProps) => {
    const { todo, handleDeleteSelected, handlePatch } = props;

    const [editing, setEditing] = useState(false);
    const [task, setTask] = useState<string>(todo.task);

    // when edit button is used
    const handleEdit = () => {
      setEditing(true);
    };
    const handleSave = () => {
      task && patchToDo(String(todo.id), task, todo.completed);
      setEditing(false);
      getToDoList();
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSave();
      }
    };

    return (
      <>
        <div className="to-do" key={todo.id}>
          <button
            className={`${todo.completed}`}
            id={String(todo.id)}
            onClick={() => handlePatch(todo.id, todo.task, !todo.completed)}
          >
            ✓
          </button>
          {editing ? (
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span className="task-text">{todo.task}</span>
          )}
          <button
            className="bin-button"
            id={String(todo.id)}
            onClick={() => handleDeleteSelected(todo.id)}
          >
            ✖
          </button>
          {!editing && (
            <button className="edit-button" onClick={handleEdit}>
              📝
            </button>
          )}
        </div>
      </>
    );
  };
  const ToDoItemWithUseCallback = React.useCallback(ToDoItem, []);

  // Update to-dos on START and on EDIT
  useEffect(() => {
    getToDoList();
  }, [input, ToDoItemWithUseCallback]);

  //GET to dos from API
  const getToDoList = async () => {
    console.log("getToDoArr works");
    try {
      const response = await axios.get(url + "/items");
      setToDoList(response.data);
    } catch (error) {
      console.error("Woops... issue with GET request: ", error);
    }
  };

  //POST to do to API
  const postToDoList = async (toDoTask: string, dueDate?: Date) => {
    console.log("postToDoArr function is running!");
    try {
      await axios.post(url + "/items", { task: toDoTask, dueDate });
    } catch (error) {
      console.error("Woops... issue with POST request: ", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input, dueDate);
    if (input && dueDate) {
      // Convert the dueDate string to a Date object
      const dueDateObject = new Date(dueDate);
      postToDoList(input, dueDateObject);
    } else {
      postToDoList(input);
    }
    setInput("");
    setDueDate("");
    getToDoList();
  };

  //PATCH a to do
  const patchToDo = async (id: string, task: string, isCompleted: boolean) => {
    console.log("patchToDo function works!");
    try {
      await axios.patch(url + "/items/" + id, {
        task,
        completed: isCompleted,
      });
    } catch (error) {
      console.error("Woops... issue with PATCH request: ", error);
      console.error(error);
    }
  };
  const handlePatch = (id: number, task: string, completed: boolean) => {
    // const { id, task, completed } = todo;
    patchToDo(String(id), task, completed).then(() => getToDoList());
  };

  //DELETE completed to dos
  const deleteCompleted = async () => {
    console.log("delete completed function works!");
    try {
      await axios.delete(url + "/completed-items");
    } catch (error) {
      console.error(
        "Woops... issue with DELETE (completed to dos) request: ",
        error
      );
    }
  };
  const handleDeleteCompleted = () => {
    deleteCompleted().then(() => getToDoList());
  };

  // DELETE selected to do
  const deleteSelected = async (id: string) => {
    console.log("delete selected function works!");
    try {
      await axios.delete(url + "/items/" + id);
    } catch (error) {
      console.error("Woops... issue with DELETE (selected) request: ", error);
    }
  };
  const handleDeleteSelected = (id: number) => {
    deleteSelected(String(id)).then(() => getToDoList());
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="task"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you need to do?"
        />
        <br />
        <span> </span>
        <input
          className="due-date-input"
          name="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <span> </span>
        <button type="submit" className="add-button">
          ➕ Add task
        </button>
      </form>
      <button className="delete-completed" onClick={handleDeleteCompleted}>
        ✖ Completed tasks
      </button>
      <div className="to-do-container">
        {toDoList.map((toDo) => (
          <ToDoItem
            key={toDo.id}
            todo={toDo}
            handlePatch={handlePatch}
            handleDeleteSelected={handleDeleteSelected}
          />
        ))}
      </div>
    </>
  );
}
