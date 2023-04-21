import { useState } from "react";

const TodoItem = ({ item, deleteItem, updateItem }) => {
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [status, setStatus] = useState("")
    console.log("the item is ", item);
    const handleUpdate = () => {
        console.log("update");
        setStatus("update");
    }
    const handleDelete = () => {
        console.log("delete");
        deleteItem(item.id);
    }
    const updateItemInTodo = () => {
        console.log("updateItem");
        let id = item.id;
        let completed = { description }
        console.log(id, completed);
        updateItem(id, completed);
        setStatus("");
    }

    return (
        <div>
            {status === "update" && <div className="Item">
                <div>
                    <span>Title:</span>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>

                <div>
                    <span>Description:</span>
                    <input
                        type="text"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                </div>

                <button className="cancel" onClick={() => setStatus("")}>Cancel</button>
                <button className="update" onClick={updateItemInTodo}>Update</button>

            </div>}

            {status === "" && <div className="Item">
                <p>
                    Title: {item.title}
                </p >
                <p>
                    Description: {item.description}
                </p >
                <div className="buttonContainer">
                    <button className="update" onClick={handleUpdate}>Update</button>
                    <button className="delete" onClick={handleDelete}>Delete</button>
                </div>
            </div>}

        </div>
    )
}

export default TodoItem;