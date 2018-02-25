import React from "react";
import { Button, Responsive, Table } from "semantic-ui-react";
import FilterBar from "./FilterBar";

const RecordTable = props => (
  <div>
    <FilterBar
      handleEnterSearchTerm={props.handleEnterSearchTerm}
      handleSelectSearchScope={props.handleSelectSearchScope}
      searchTerm={props.searchTerm}
      searchScope={props.searchScope}
    />
    <Table compact="very">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Projekt</Table.HeaderCell>
          <Table.HeaderCell>Teilprojekt</Table.HeaderCell>
          <Responsive as={Table.HeaderCell} {...Responsive.onlyComputer}>
            Arbeitspaket
          </Responsive>
          <Responsive as={Table.HeaderCell} {...Responsive.onlyComputer}>
            Tätigkeit
          </Responsive>
          <Table.HeaderCell>Beschreibung</Table.HeaderCell>
          <Table.HeaderCell>Datum</Table.HeaderCell>
          <Table.HeaderCell>Aufwand</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.records.map((record, index) => {
          while (index < 15) {
            return (
              <Table.Row key={record.id}>
                <Table.Cell>{record.project}</Table.Cell>
                <Table.Cell>{record.subproject}</Table.Cell>
                <Responsive as={Table.Cell} {...Responsive.onlyComputer}>
                  {record.task}
                </Responsive>
                <Responsive as={Table.Cell} {...Responsive.onlyComputer}>
                  {record.activity}
                </Responsive>
                <Table.Cell>{record.description}</Table.Cell>
                <Table.Cell>{record.date}</Table.Cell>
                <Table.Cell>{record.timeSpent}</Table.Cell>
                <Table.Cell>
                  <Button
                    icon="delete"
                    onClick={props.handleRemove.bind(this, record.id)}
                  />
                </Table.Cell>
              </Table.Row>
            );
          }
        })}
      </Table.Body>
    </Table>
  </div>
);

export default RecordTable;
