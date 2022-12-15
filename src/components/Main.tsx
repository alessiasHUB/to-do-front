import axios from "axios";
import { useState, useEffect } from "react";

export interface IToDo {
  task: string;
  completed: boolean;
  id: number;
}

// when running locally
// const url = "http://localhost:4000"

// when deployed
const url = "https://to-do-back.onrender.com";

export default function Main(): JSX.Element {
  const [toDoList, setToDoList] = useState<IToDo[]>([]);
  const [input, setInput] = useState<string>("");

  // Update to-dos on START
  useEffect(() => {
    getToDoList();
  }, [toDoList]);

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
  const postToDoList = async (toDoTask: string) => {
    console.log("postToDoArr function is running!");
    try {
      await axios.post(url + "/items", { task: toDoTask });
    } catch (error) {
      console.error("Woops... issue with POST request: ", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    postToDoList(input);
    setInput("");
  };

  //PATCH a to do
  const patchToDo = async (id: string, isCompleted: boolean) => {
    console.log("patchToDo function works!");
    try {
      await axios.patch(url + "/items/" + id, {
        completed: !isCompleted,
      });
    } catch (error) {
      console.error("Woops... issue with PATCH request: ", error);
    }
  };
  const handlePatch = async (id: number, completed: boolean) => {
    await patchToDo(String(id), completed);
    getToDoList();
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

  // DELETE selected to dos
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
        <span> </span>
        <button type="submit">+</button>
      </form>
      <button className="delete-completed" onClick={handleDeleteCompleted}>
        🗑 Completed tasks
      </button>
      <div className="to-do-container">
        {toDoList.map((toDo) => {
          return (
            <div className="to-do" key={toDo.id}>
              <button
                className={`${toDo.completed}`}
                id={String(toDo.id)}
                onClick={() => handlePatch(toDo.id, toDo.completed)}
              ></button>
              <span className="task-text">{toDo.task}</span>
              <button
                className="bin-button"
                id={String(toDo.id)}
                onClick={() => handleDeleteSelected(toDo.id)}
              >
                🗑
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
