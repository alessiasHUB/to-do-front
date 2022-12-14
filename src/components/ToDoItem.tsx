import { IToDo } from "./Main";

interface Props {
    data: IToDo ;
    handleCompleted:  (toDoID: number, isCompleted: boolean) => void;
    // handleDeleted: (toDoID: number, isDeleted: boolean) => void;
}

export default function ToDoItem(props: Props): JSX.Element {
// ✅ ⬜
    return (
        <div className='to-do' >
            <button 
                className={`${props.data.completed}`}
                id={String(props.data.id)}
                onClick={(e) =>props.handleCompleted(Number(e.currentTarget.id), props.data.completed)}
            >_</button>
            <span>{props.data.task}</span>
            <button 
                // id={String(props.data.id)}
                // onClick={(e) =>props.handleDeleted(Number(e.currentTarget.id), props.data.deleted)}
            >🗑</button>
        </div>
    )
}