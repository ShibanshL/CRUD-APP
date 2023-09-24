import React, { useEffect, useState } from "react";
import "./Main.css";
import { useCategory, useStore, useSearch } from "../API_MNAGE";

function Filter() {
  const search = useSearch((state: any) => state.search);
  const setSearch = useSearch((state: any) => state.setsearch);

  return (
    <div className="Filter">
      <div className="TopFilter">
        <input
          placeholder="SEARCH"
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
          name="SEARCH"
          data-testid="Searchinp"
        />
      </div>
      <div className="Filter_Buttons">
        <button
          name="CLEAR FILTER"
          onClick={() => {
            setSearch("");
          }}
        >
          CLEAR FILTER
        </button>
      </div>
    </div>
  );
}

export default Filter;
