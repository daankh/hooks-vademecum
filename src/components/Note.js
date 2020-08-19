import React, { useEffect } from "react";

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

export default Note;
