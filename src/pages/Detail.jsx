import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { PropTypes } from "prop-types";
import Header from "./../components/Header";
import { archiveNote, deleteNote, getNote, unarchiveNote } from "../utils/api";
import { showFormattedDate } from "../utils";

function DetailWrapper() {
  const params = useParams();
  const navigate = useNavigate();

  return <Detail id={params.id} navigate={navigate} />;
}

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      initializing: true,
    };

    this.deleteNoteHandler = this.deleteNoteHandler.bind(this);
    this.changeArchiveStatusHandler =
      this.changeArchiveStatusHandler.bind(this);
  }

  async componentDidMount() {
    try {
      const detailNote = await getNote(this.props.id);

      this.setState({
        note: detailNote.data,
        initializing: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteNoteHandler = (id) => {
    deleteNote(id);

    this.props.navigate("/");
  };

  changeArchiveStatusHandler = (id) => {
    if (this.state.note.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }

    this.props.navigate("/");
  };

  render() {
    if (this.state.initializing) {
      return null;
    }

    return (
      <>
        <Header />
        <div className="note-app__body">
          <div className="detail-page">
            {this.state.note?.id ? (
              <>
                <h1 className="detail-page__title">{this.state.note?.title}</h1>
                <p className="detail-page__createdAt">
                  {showFormattedDate(this.state.note?.createdAt)}
                </p>
                <p className="detail-page__body">{this.state.note?.body}</p>
              </>
            ) : (
              <h1>Catatan dengan Id {this.props.id} tidak ditemukan.</h1>
            )}
          </div>
          {this.state.note?.id && (
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
                  onClick={() => this.deleteNoteHandler(this.state.note?.id)}
                >
                  Hapus
                </button>
                <button
                  className="note-item__archive-button"
                  onClick={() =>
                    this.changeArchiveStatusHandler(this.state.note?.id)
                  }
                >
                  {!this.state.note?.archived ? "Arsipkan" : "Pindahkan"}
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
