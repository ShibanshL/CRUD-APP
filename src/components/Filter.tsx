import React, { useEffect, useState } from "react";
import "./Main.css";
import { useCategory, useStore, useSearch } from "../API_MNAGE";

function Filter() {
  const category = useCategory((state: any) => state.category);
  const setCategory = useCategory((state: any) => state.setCategory);
  const setChange = useStore((state: any) => state.inc);
  const search = useSearch((state: any) => state.search);
  const setSearch = useSearch((state: any) => state.setsearch);
  const [inpt, setInpt] = useState("");
  const [filter, setFilter] = useState("");

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
        {/* <select
          className="StatusCheck"
          value={filter}
          onChange={(e: any) => {
            setCategory(e.target.value);
          }}
        >
          <option selected disabled value="">
            Choose an option
          </option>
          <option value="ALL">ALL</option>
          <option value="DONE">DONE</option>
          <option value="NOT DONE">NOT DONE</option>
        </select> */}
      </div>
      <div className="Filter_Buttons">
        <button
          name="CLEAR FILTER"
          onClick={() => {
            // setCategory("");
            // setFilter("");
            // setChange();
            setSearch("");
            // setInpt("");
          }}
        >
          CLEAR FILTER
        </button>
        {/* <button
          name="FILTER"
          onClick={() => {
            setCategory(filter);
            setSearch(inpt);
          }}
        >
          FILTER
        </button> */}
      </div>
    </div>
  );
}

export default Filter;
