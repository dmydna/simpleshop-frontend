import { useUrlParams } from "@/hooks/useUrlParams";
import { useUrlState } from "@/hooks/useUrlState";
import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";

export default function SearchLight({ className }) {
  const [query, setQuery] = useState("");
  const { setSearchParams } = useUrlState();
  const { typeParam } = useUrlParams();

  const handleFilter = () => {
    setSearchParams({ dialog: "filter" });
  };

  const handleType = () => {
    setSearchParams({ dialog: "type" });
  }


  const handleSearch = (search) => {
    setSearchParams((prev) => {
      let s = { query: search };
      if (prev && Object.keys(prev).length !== 0) {
        if (prev?.type) {
          s.type = search ? prev.type : null;
        }
      }
      return s;
    });
  };

  useEffect(() => {
    if (!query.trim()) {
      handleSearch(null);
      return;
    }
    if (query != "") {
      handleSearch(query);
    }
  }, [query]);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
  }

  return (
    <div className={`d-flex align-items-center my-2 ${className}`}>
      <InputGroup className="border rounded">
        <input
          type="text"
          placeholder={
            typeParam ? `search by ${typeParam}...` : "Buscar entrada..."
          }
          className="form-control border-0 no-focus"
          value={query}
          onChange={handleChange}
        />
        <span className={`p-0 m-0 border-0`}>
          <span
            onClick={handleType}
            className="d-inline-block btn opacity-50"
          >
            <i className="bi-gear"></i>
          </span>
          <span
            onClick={handleFilter}
            className="d-inline-block d-md-none btn opacity-50"
          >
            <i className="bi-sliders"></i>
          </span>
        </span>
        <span className="btn opacity-50">
          <i className="bi-search"></i>
        </span>
      </InputGroup>
    </div>
  );
}
