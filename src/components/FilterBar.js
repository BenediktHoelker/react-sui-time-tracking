import React from "react";
import { Select, Input } from "semantic-ui-react";

const options = [
  { key: "date", text: "Datum", value: "date" },
  { key: "project", text: "Projekt", value: "project" },
  { key: "subproject", text: "Teilprojekt", value: "subproject" }
];

const FilterBar = props => (
  <Input
    fluid
    type="text"
    placeholder="Filtern nach..."
    action
    value={props.searchTerm}
    onChange={props.handleEnterSearchTerm}
  >
    <input />
    <Select
      compact
      options={options}
      value={props.searchScope}
      defaultValue="date"
      onChange={props.handleSelectSearchScope}
    />
  </Input>
);

export default FilterBar;
