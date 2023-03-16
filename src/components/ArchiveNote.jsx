import React from "react";
import { PropTypes } from "prop-types";
import Empty from "./Empty";
import NotesItem from "./NotesItem";

function ArchiveNote({ notes }) {
  const notesArchive = !notes.length
    ? []
    : notes.filter((note) => note.archived === true);

  return (
    <>
      <h2>Arsip</h2>
      {!notesArchive.length ? (
        <Empty />
      ) : (
        <div className="notes-list">
          {notesArchive.map((note, index) => {
            return <NotesItem key={index} note={note} />;
          })}
        </div>
      )}
    </>
  );
}

ArchiveNote.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default ArchiveNote;
