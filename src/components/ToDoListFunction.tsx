import axios from "axios"
import { useState, useEffect } from "react"

export interface IToDo {
    task: string;
    completed: boolean;
    id: number;
}

const url = "http://localhost:4000"

export default function ToDoListFunction(): JSX.Element {
    const [toDoList, setToDoList] = useState<IToDo[]>([]);
    const [input, setInput] = useState<string>('')
    const [update, setUpdate] = useState<boolean>(false);
    //const [formState, setFormState] = useState({
    //    task: '',
    //});

    // Update to-dos on start
    useEffect(() => {
        getToDoList();
    }, []);

    //GET to dos from API
    const getToDoList = async () => {
        console.log("getToDoArr works");
        try {
        const response = await axios.get(url + "/items");
        setToDoList(response.data);
        } catch (error) {
        console.error(
            "Woops... issue with GET request: ",
            error
        );
        }
    };

    //POST to do to API
    const postToDoList = async (toDoTask: string) => {
        console.log("postToDoArr function is running!");
        try {
          await axios.post(url + "/items", { task: toDoTask });
        } catch (error) {
          console.error(
            "Woops... issue with POST request: ",
            error
          );
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(input)
        postToDoList(input)
    }
    //PATCH a to do
    //DELETE completed to dos

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                    name='task'
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" ></button>
            </form>
            {toDoList.map((el) => {
                return (
                    <div key={el.id}>{el.task}</div>
                )
            })}
        </>
    )
}