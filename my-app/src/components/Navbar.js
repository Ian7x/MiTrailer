import React from "react";

export default function Navbar({ fetchMovies, setSearchKey, searchKey }) {
  return (
    <header className="header">
      <div className="center-header">
        <div className="home">
          <span className="brand">MiTr@iler</span>
        </div>
        <form className="form" onSubmit={fetchMovies}>
          <input
            className="search"
            type="text"
            id="search"
            onInput={(event) => setSearchKey(event.target.value)}
            value={searchKey}
            placeholder="Search"
          />
          <button className="submit-search" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </header>
  );
}
