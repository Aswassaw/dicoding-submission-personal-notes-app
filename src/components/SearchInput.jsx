import React from "react";
import { PropTypes } from "prop-types";

function SearchInput({ searchKeyword, search }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="note-search">
        <input
          type="text"
          placeholder="Cari catatan berdasarkan title"
          onChange={(e) => search(e)}
          value={searchKeyword}
        />
      </div>
    </div>
  );
}

SearchInput.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
};

export default SearchInput;
