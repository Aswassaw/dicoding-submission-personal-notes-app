import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { PropTypes } from "prop-types";
import {
  archiveOrUnarchiveNote,
  deleteNote,
  getAllNotes,
  showFormattedDate,
} from "../utils";
import Header from "./../components/Header";

function DetailWrapper() {
  const params = useParams();
  const navigate = useNavigate();

  return <Detail id={params.id} navigate={navigate} />;
}

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getAllNotes().filter((note) => note.id === this.props.id),
    };

    this.deleteNoteHandler = this.deleteNoteHandler.bind(this);
    this.changeArchiveStatusHandler =
      this.changeArchiveStatusHandler.bind(this);
  }

  deleteNoteHandler = (id) => {
    deleteNote(id);

    this.props.navigate("/");
  };

  changeArchiveStatusHandler = (id) => {
    archiveOrUnarchiveNote(id);

    this.props.navigate("/");
  };

  render() {
    return (
      <>
        <Header />
        <div className="note-app__body">
          <div className="detail-page">
            {this.state.note.length ? (
              <>
                <h1 className="detail-page__title">
                  {this.state.note[0]?.title}
                </h1>
                <p className="detail-page__createdAt">
                  {showFormattedDate(this.state.note[0]?.createdAt)}
                </p>
                <p className="detail-page__body">{this.state.note[0]?.body}</p>
              </>
            ) : (
              <h1>Catatan dengan Id {this.props.id} tidak ditemukan.</h1>
            )}
          </div>
          {this.state.note.length && (
            <div
              style={{
                width: "60%",
                margin: "0 auto",
                marginTop: "40px",
              }}
            >
              <div className="note-item__action">
                <button
                  className="note-item__delete-button"
                  onClick={() => this.deleteNoteHandler(this.state.note[0]?.id)}
                >
                  Hapus
                </button>
                <button
                  className="note-item__archive-button"
                  onClick={() =>
                    this.changeArchiveStatusHandler(this.state.note[0]?.id)
                  }
                >
                  {!this.state.note[0]?.archived ? "Arsipkan" : "Pindahkan"}
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

Detail.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailWrapper;
