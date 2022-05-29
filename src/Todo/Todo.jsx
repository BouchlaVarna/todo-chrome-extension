/* global chrome  */
import { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [completedTasks, setCompletedTasks] = useState(0);
    const inputVal = useRef(null);

    useEffect(() => {
        chrome.storage.local.get(['todos'], (result) => {
            setTodos(result.todos);
        });
        chrome.storage.local.get(['completed'], (result) => {
            setCompletedTasks(result.completed);
        });
    }, []);

    useEffect(() => {
        chrome.storage.local.set({'todos': todos}, function() {
            console.log('Value is set to ' + todos);
        });
    }, [todos])

    const handleAdd = () => {
        setTodos(todos => [...todos, inputVal.current.value]);
    }

    return (
        <>
            <div id="nav-wrapper">
                <nav>
                    <ul>
                        <li>Total tasks completed: {completedTasks}</li>
                    </ul>
                </nav>
            </div>
            <div>
                <button onClick={handleAdd}>Add</button>
                <input placeholder="Task" ref={inputVal} type="text"></input>
            </div>
            {todos.map(todo => {
                return <TodoItem text={todo} allTodos={todos} removeTodo={setTodos} countCompleted={setCompletedTasks} />
            })}
        </>
    );
}

export default Todo;