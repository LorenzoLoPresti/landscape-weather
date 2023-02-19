import { useState } from "react";

const MySearchbar = ({ setSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <form action="" className="text-center text-light">
      <h1 style={{ fontSize: "2rem" }} className="pb-3 fw-light">
        Landscape Weather
      </h1>
      <input
        type="text"
        placeholder="Search by city"
        className="px-3 text-light"
        value={searchValue}
        style={{
          borderRadius: "100px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          backgroundColor: "rgba(255,255,255,0.2)",
          width: "35%",
          padding: "2px 0",
        }}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <button
        className="ms-1  px-4 text-light"
        style={{
          borderRadius: "100px",
          backgroundColor: "rgba(8, 39, 71, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "2px 0",
        }}
        onClick={(e) => {
          e.preventDefault();

          setSearch(searchValue);
          setSearchValue("");
        }}
      >
        Search
      </button>
    </form>
  );
};
export default MySearchbar;
