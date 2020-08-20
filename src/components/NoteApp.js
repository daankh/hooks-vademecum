import React, { useEffect, useReducer } from "react";
import notesReducer from "../reducers/notes";
import NoteList from "./NoteList";
import AddNoteForm from "./AddNoteForm";

const NoteApp = () => {
  // const [notes, setNotes] = useState([]);
  const [notes, dispatch] = useReducer(notesReducer, []);

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
      <NoteList notes={notes} removeNote={removeNote} />
      <AddNoteForm dispatch={dispatch} />
    </div>
  );
};

export default NoteApp;
