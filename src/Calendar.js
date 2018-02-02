import React from "react"
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Responsive,
  Segment,
  Table
} from "semantic-ui-react"
import moment from "moment"

const daysOfEffort = []
const monthDate = moment().startOf('month') // change to a date in the month of interest
const daysInMonthCount = monthDate.daysInMonth()
const todayDaysCount = moment().date()

for (var i = 0; i < todayDaysCount; i++) {
  daysOfEffort.push({ id: i, date: monthDate.format('DD.MM.YYYY'), effort: "9:06" })
  monthDate.add(1, 'day')
}

const DaysTable = props => (
  <Table compact="very" unstackable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Datum</Table.HeaderCell>
        <Table.HeaderCell>Aufwand</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Arbeit erfassen</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {daysOfEffort.map(day => {
        return (
          <Table.Row key={day.id}>
            <Table.Cell>{day.date}</Table.Cell>
            <Table.Cell>{day.effort}</Table.Cell>
            <Table.Cell>
              <Icon name="checkmark" size="large" />
            </Table.Cell>
            <Table.Cell />
          </Table.Row>
        );
      })}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>23</Table.HeaderCell>
        <Table.HeaderCell />
        <Table.HeaderCell />
      </Table.Row>
    </Table.Footer>
  </Table>
);

export default DaysTable;
