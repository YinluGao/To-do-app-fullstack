import './App.css';
import NewItem from './Components/NewItem';
import TodoItem from './Components/TodoItem';
import React, { useEffect, useState } from 'react';

function App() {

  const [items, setItems] = useState(null);

  let url = "http://localhost:8080/";

  // call backend to retrieve item list
  const getItems = async () => {
    const response = await fetch(url + "tasks/");
    const data = await response.json();
    setItems(data);
    console.log(data);
  }

  useEffect(() => {
    getItems();
  }, [])

  // post request add new Item to backend
  const postNewItem = async (newItem) => {
    const response = await fetch(url + "task/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });
    getItems();
  }

  const addItem = (item) => {
    postNewItem(item);
  }

  const deleteItem = async (id) => {
    const response = await fetch(url + "task/" + id, {
      method: "DELETE"
    });
    getItems();
  }

  const updateItem = async (id, completed) => {
    console.log("in App", id, completed);
    const response = await fetch(url + "task/" + id, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(completed)
    });
    //getItems();
  }

  return (
    <div>
      This is App
      <NewItem addItem={addItem} />
      {items &&
        items.map((item, index) =>
          <TodoItem
            key={index}
            item={item}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />)}
    </div>
  );
}

export default App;