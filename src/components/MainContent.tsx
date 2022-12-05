import { useState } from "react";

type ToDo = {
  id: number;
  task: string;
  // completed: boolean;
  // creationDate: string;
  // dueDate: string | null;
};

export default function MainContent(): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [tasks, setTasks] = useState<ToDo[]>();
  // const [day, setDay] = useState<string>("");
  // const [month, setMonth] = useState<string>("");
  // const [year, setYear] = useState<string>("");

  // const date = new Date();
  const url  = 'http://localhost:4000/items';

  // hooking up to to-do-back(end)
  // use .fetch() to get the data array
  // this gets an array of tasks from the back-end
  async function handleGetToDoList() {
    const httpRes = await fetch(url);
    const taskObj = await httpRes.json();
    // tasks 
    //   ? await fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => setTasks([data,...tasks]))
    //   : await fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => setTasks([data]));
    console.log(taskObj)
  }

  const handleAddTask = () => {
    const task: ToDo = {
      id: tasks !== undefined ? tasks.length + 1 : 1,
      task: input,
      // completed: false,
      // creationDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
      // dueDate:
      //   day !== "" && month !== "" && year !== ""
      //     ? `${day}/${month}/${year}`
      //     : null,
    };

    tasks ? setTasks([...tasks, task]) : setTasks([task]);

    // reset all inputs
    // setDay("");
    // setMonth("");
    // setYear("");
    // setInput("");
  };

  return (
    <>
      <header>
        <h1>To Do App</h1>
        <button onClick={handleGetToDoList}>Get my To-do List</button>
      </header>
      <main>
        <div>
          <span>To do task: </span>
          <input
            value={input}
            type="text"
            placeholder="Write your task here!"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <br />
          <br />
          {/* <div className="due-date">
            <span>Due date (optional): </span>
            <input
              className="date-input"
              value={day}
              type="text"
              placeholder="00"
              onChange={(e) => {
                setDay(e.target.value);
              }}
            />
            <span> </span>
            <input
              className="date-input"
              value={month}
              type="text"
              placeholder="00"
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            />
            <span> </span>
            <input
              className="date-input-year"
              value={year}
              type="text"
              placeholder="0000"
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </div> */}
          <br />
          <br />
          <button type="submit" onClick={handleAddTask}>
            Add
          </button>
        </div>
        {tasks !== undefined && (
          <ul>
            {tasks.map((el) => {
              return (
                <li key={el.id}>
                  <span>task: {el.task}</span>
                  {/* {el.dueDate && <span>, due: {el.dueDate}</span>} */}
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}

/**
 * POSSIBLE FEATURES:
 * Adding and editing todos
 * Marking todos as 'complete'
 * Deleting todos
 * Sorting todos by creation date
 * Setting a due date
 * Filtering overdue todos
 */
