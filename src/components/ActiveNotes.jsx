import React from "react";
import { PropTypes } from "prop-types";
import Empty from "./Empty";
import NotesItem from "./NotesItem";

function ActiveNotes({ notes }) {
  const notesActive = !notes.length
    ? []
    : notes.filter((note) => note.archived === false);

  return (
    <>
      <h2>Catatan Aktif</h2>
      {!notesActive.length ? (
        <Empty />
      ) : (
        <div className="notes-list">
          {notesActive.map((note, index) => {
            return <NotesItem key={index} note={note} />;
          })}
        </div>
      )}
    </>
  );
}

ActiveNotes.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default ActiveNotes;
