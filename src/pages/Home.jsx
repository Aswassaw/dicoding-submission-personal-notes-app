import React, { Component } from "react";
import { useSearchParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import { getAllNotes } from "../utils";
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import ActiveNotes from "../components/ActiveNotes";
import ArchiveNote from "./../components/ArchiveNote";
import Footer from "./../components/Footer";

function HomeWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <Home defaultKeyword={keyword || ""} keywordChange={changeSearchParams} />
  );
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      searchNotes: getAllNotes().filter((note) =>
        note.title.toLowerCase().includes(props.defaultKeyword.toLowerCase())
      ),
      searchKeyword: props.defaultKeyword || "",
    };

    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler = (e) => {
    this.setState({
      searchNotes: this.state.notes.filter((note) =>
        note.title.toLowerCase().includes(e.target.value.toLowerCase())
      ),
      searchKeyword: e.target.value,
    });

    this.props.keywordChange(e.target.value);
  };

  render() {
    return (
      <>
        <Header />
        <div className="note-app__body">
          <SearchInput
            searchKeyword={this.state.searchKeyword}
            search={this.searchHandler}
          />
          <ActiveNotes
            notes={
              this.state.searchKeyword
                ? this.state.searchNotes
                : this.state.notes
            }
          />
          <ArchiveNote
            notes={
              this.state.searchKeyword
                ? this.state.searchNotes
                : this.state.notes
            }
          />
        </div>
        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  defaultKeyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default HomeWrapper;
