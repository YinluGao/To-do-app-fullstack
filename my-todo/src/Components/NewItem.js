import React, { useState } from "react";

const NewItem = ({ addItem }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleTitle = (e) => {
        setTitle(e.target.value);
        //console.log(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleAdd = () => {
        addItem({
            title: title,
            description: description,
        })
        setTitle("");
        setDescription("");
    }
    return (

        <div className="NewItem">
            <div>
                <span>Title:</span>
                <input
                    type="text"
                    onChange={handleTitle}
                    value={title}
                />
            </div>

            <div>
                <span>Description:</span>
                <input
                    type="text"
                    onChange={handleDescription}
                    value={description}
                />
            </div>

            <button className="subButton" onClick={handleAdd}>add</button>


        </div>
    )
}

export default NewItem;