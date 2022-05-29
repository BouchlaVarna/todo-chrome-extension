/* global chrome  */
import { useEffect } from "react";

const TodoItem = ({text, allTodos, removeTodo, countCompleted}) => {

    useEffect(() => {
        chrome.storage.local.set({'todos': allTodos}, function() {
            console.log('Value is set to ' + allTodos);
        });
    }, [allTodos])

    const handleRemove = () => {
        removeTodo(allTodos.filter(todo => todo !== text));

        chrome.storage.local.set({'todos': allTodos}, function() {
            console.log('Value is set to ' + allTodos);
        });
        
        chrome.storage.local.get(['completed'], (result) => {
                if (!result.completed) result.completed = 0;
                countCompleted(result.completed + 1);

                chrome.storage.local.set({'completed': result.completed + 1}, function() {
                    console.log('Value is set to ' + result.completed);
            });
        });
    }

    return (
        <div id="todo-wrapper">
            <input type="checkbox" name="" id="" onChange={handleRemove} />
            <p>{text}</p>
        </div>
    );
}

export default TodoItem;