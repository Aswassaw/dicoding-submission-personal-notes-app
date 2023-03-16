import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { showFormattedDate } from "../utils";

function NotesItem({ note }) {
  return (
    <div className="note-item">
      <div className="note-item__content">
        <h3 className="note-item__title">
          <Link to={`/detail/${note.id}`}>{note.title}</Link>
        </h3>
        <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
        <p className="note-item__body">{note.body}</p>
      </div>
    </div>
  );
}

NotesItem.propTypes = {
  note: PropTypes.object,
};

export default NotesItem;
