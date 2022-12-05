import axios from "axios"
import { useState, useEffect } from "react"

export interface IToDo {
    task: string;
    // complete: boolean;
    id: number;
}

const url = "http://localhost:4000"

export default function ToDoListFunction(): JSX.Element {
    const [toDoList, setToDoList] = useState<IToDo[]>([]);
    const [input, setInput] = useState<string>('')
    const [update, setUpdate] = useState<boolean>(false);

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
            "Woops... there's an issue with your GET request: ",
            error
        );
        }
    };

    return (
        <>
            {toDoList.map((el) => {
                return (
                    <div key={el.id}>{el.task}</div>
                )
            })}
        </>
    )
}