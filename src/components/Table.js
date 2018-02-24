import React from "react";
import {
  Button,
  Responsive,
  Table
} from "semantic-ui-react";

const RecordTable = props => (
  <div>
    <Table unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Projekt</Table.HeaderCell>
          <Responsive as={Table.HeaderCell} {...Responsive.onlyComputer}>
            Teilprojekt
          </Responsive>
          <Table.HeaderCell>Arbeitspaket</Table.HeaderCell>
          <Table.HeaderCell>Tätigkeit</Table.HeaderCell>
          <Table.HeaderCell>Beschreibung</Table.HeaderCell>
          <Table.HeaderCell>Aufwand</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.records.map(record => {
          return (
            <Table.Row key={record.id}>
              <Table.Cell>{record.project}</Table.Cell>
              <Responsive as={Table.Cell} {...Responsive.onlyComputer}>
                {record.subproject}
              </Responsive>
              <Table.Cell>{record.task}</Table.Cell>
              <Table.Cell>{record.activity}</Table.Cell>
              <Table.Cell>{record.description}</Table.Cell>
              <Table.Cell>{record.timeSpent}</Table.Cell>
              <Table.Cell>
                <Button
                  icon="delete"
                  onClick={props.handleRemove.bind(this, record.id)}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  </div>
);

export default RecordTable;
