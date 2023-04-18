const TodoItem = ({ item }) => {
    return (
        <div className="Item">
            <p>
                Title: {item.title}
            </p>
            <p>
                Description: {item.description}
            </p>
            <div className="buttonContainer">
                <button className="update">Update</button>
                <button className="delete">Delete</button>
            </div>
        </div>
    )
}

export default TodoItem;