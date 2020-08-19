import React, { useState, useEffect, useReducer } from "react";
import notesReducer from "../reducers/notes";
import Note from "./Note";

const NoteApp = () => {
  // const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const notes = localStorage.getItem("notes");
    if (notes) {
      dispatch({
        type: "POPULATE_NOTES",
        notes: JSON.parse(notes),
      });
      // setNotes(JSON.parse(notesData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    if (title) {
      // setNotes([...notes, { title: title.trim(), body: body.trim() }]);
      dispatch({
        type: "ADD_NOTE",
        note: { title: title.trim(), body: body.trim() },
      });
      setTitle("");
      setBody("");
    }
  };

  const removeNote = (title) => {
    // const newNotes = notes.filter((note) => note.title !== title);
    dispatch({
      type: "REMOVE_NOTE",
      title,
    });
    // setNotes(newNotes);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        {notes.map((note) => (
          <Note
            key={note.title}
            note={note}
            removeNote={() => removeNote(note.title)}
          />
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

export default NoteApp;
