import React from "react";
import { useNavigate } from "react-router";
import AddNote from "./../components/AddNote";
import Header from "./../components/Header";
import { addNote } from "../utils/api";

export default function Add() {
  const navigate = useNavigate();

  const addNoteHandler = ({ title, body }) => {
    addNote({ title, body });

    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="note-app__body">
        <AddNote addNote={addNoteHandler} />
      </div>
    </>
  );
}
