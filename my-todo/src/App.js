
import './App.css';
import NewItem from './Components/NewItem';
import TodoItem from './Components/TodoItem';
import React, { useEffect, useState } from 'react';

function App() {
  // let itemLists = [
  //   {
  //     title: "Breakfast",
  //     description: "Milk and Bacon",
  //   },
  //   {
  //     title: "Shopping List",
  //     description: "Dipper and ff"
  //   }
  // ];

  const [items, setItems] = useState(null);

  let url = "http://localhost:8080/";

  // call backend to retrieve item list
  const getItems = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setItems(data);
  }

  useEffect(() => {
    getItems();
  }, [])

  // post request add new Item to backend
  const postNewItem = async (newItem) => {
    const response = await fetch(url + "newitem/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });
    const data = await response.json();
    //console.log(data);
    setItems(data);
  }

  const addItem = (item) => {
    // console.log(item);
    // setItems(pre => {
    //   console.log([...pre, item]);
    //   return [...pre, item];
    // });
    postNewItem(item);

  }

  return (
    <div>
      This is App
      <NewItem addItem={addItem} />
      {items &&
        items.map((item, index) =>
          <TodoItem key={index} item={item} />)}

    </div>
  );
}

export default App;
