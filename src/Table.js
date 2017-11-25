import React from 'react'
import { Table } from 'semantic-ui-react'

const TableExampleColumnCount = (props) => (
  <Table columns={5}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Projekt</Table.HeaderCell>
        <Table.HeaderCell>Teilprojekt</Table.HeaderCell>
        <Table.HeaderCell>Arbeitspaket</Table.HeaderCell>
        <Table.HeaderCell>Tätigkeit</Table.HeaderCell>
        <Table.HeaderCell>Beschreibung</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.items.map((item) => {
        return (
          <Table.Row key={item.id}>
            <Table.Cell>{item.project}</Table.Cell>
            <Table.Cell>{item.subproject}</Table.Cell>
            <Table.Cell>{item.workitem}</Table.Cell>
            <Table.Cell>{item.task}</Table.Cell>
            <Table.Cell>{item.description}</Table.Cell>
          </Table.Row>
        )
      })}
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell>3 People</Table.HeaderCell>
        <Table.HeaderCell>2 Approved</Table.HeaderCell>
        <Table.HeaderCell />
        <Table.HeaderCell />
        <Table.HeaderCell />
      </Table.Row>
    </Table.Footer>
  </Table>
)

export default TableExampleColumnCount