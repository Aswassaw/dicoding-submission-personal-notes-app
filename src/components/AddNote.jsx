import React, { Component } from "react";
import { PropTypes } from "prop-types";

class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        title: "",
        body: "",
      },
      limit: 50,
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value,
      },
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    this.props.addNote(this.state.form);
    this.setState({
      form: {
        title: "",
        body: "",
      },
    });
  };

  render() {
    return (
      <div className="note-input">
        <h2>Buat Catatan</h2>
        <form onSubmit={this.submitHandler}>
          <p className="note-input__title__char-limit">
            Sisa karakter: {this.state.limit - this.state.form.title.length}
          </p>
          <input
            className="note-input__title"
            type="text"
            id="title"
            onChange={(e) => {
              if (e.target.value.length <= this.state.limit) {
                this.inputChangeHandler(e);
              }
            }}
            value={this.state.form.title}
            placeholder="Masukkan judul"
            required
          />
          <textarea
            className="note-input__body"
            type="text"
            id="body"
            onChange={this.inputChangeHandler}
            value={this.state.form.body}
            placeholder="Masukkan catatan"
            required
          />
          <button type="submit">Buat</button>
        </form>
      </div>
    );
  }
}

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default AddNote;
