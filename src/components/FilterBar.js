import React from "react";
import { Select, Input } from "semantic-ui-react";

const options = [
  { key: "project", text: "Projekt", value: "project" },
  { key: "date", text: "Datum", value: "date" }
];

const FilterBar = props => (
  <Input type="text" placeholder="Suchen..." action value={props.searchTerm} onChange={props.handleEnterSearchTerm}>
    <input />
    <Select compact options={options} defaultValue="project" />
  </Input>
);

export default FilterBar;
