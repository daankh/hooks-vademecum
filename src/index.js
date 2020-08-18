import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

const App = (props) => {
  const [count, setCount] = useState(props.count);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log(text);
  }, [text]);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(props.count);
  };

  return (
    <div>
      <p>
        The current {text || "count"} is {count}
      </p>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+1</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log("Start effect");

    return () => {
      console.log("cleaning effect");
    };
  }, []);

  return (
    <div>
      <h3>
        <span>{note.title}</span>
        <button onClick={removeNote}>remove</button>
      </h3>
      {note.body && <p>{note.body}</p>}
    </div>
  );
};

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const notesData = localStorage.getItem("notes");
    if (notesData) {
      setNotes(JSON.parse(notesData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (title) {
      setNotes([...notes, { title: title.trim(), body: body.trim() }]);
      setTitle("");
      setBody("");
    }
  };

  const removeNote = (id) => {
    const newNotes = notes.filter((note, index) => index !== id);
    setNotes(newNotes);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {notes.map((note, index) => (
          <Note key={index} note={note} removeNote={() => removeNote(index)} />
        ))}
      </div>
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    {/*<App count={0} />*/}
    {<NoteApp />}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
