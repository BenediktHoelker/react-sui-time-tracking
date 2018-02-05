import React from "react";
import {
  Button,
  Responsive,
  Table
} from "semantic-ui-react";

const WorkItemTable = props => (
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
        {props.items.map(item => {
          return (
            <Table.Row key={item.id}>
              <Table.Cell>{item.project}</Table.Cell>
              <Responsive as={Table.Cell} {...Responsive.onlyComputer}>
                {item.subproject}
              </Responsive>
              <Table.Cell>{item.scope}</Table.Cell>
              <Table.Cell>{item.task}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.timeSpent}</Table.Cell>
              <Table.Cell>
                <Button
                  icon="delete"
                  onClick={props.handleRemove.bind(this, item.id)}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  </div>
);

export default WorkItemTable;
