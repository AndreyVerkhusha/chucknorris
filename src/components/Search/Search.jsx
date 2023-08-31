import React, { memo } from "react";
import "./Search.scss";

const Search = ({setSearchValue, searchValue, total}) => {

  return (
    <div className="search">
      <input
        value={searchValue}
        autoFocus={true}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={"Search jokes..."}
        type="text"
      />
      {total > 0 &&
        <div className="search_result">
          Found jokes: {total}
        </div>
      }
    </div>
  );
};

export default memo(Search);