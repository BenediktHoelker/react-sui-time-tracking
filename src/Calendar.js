import React from 'react'
import { Button, Container, Grid, Header, Icon, Responsive, Segment, Table } from 'semantic-ui-react'
import moment from 'moment'

const days = [
  { "id": 1, "date": "1/12/2018", "effort": "9:06" },
  { "id": 2, "date": "1/24/2018", "effort": "11:12" },
  { "id": 3, "date": "1/24/2018", "effort": "9:03" },
  { "id": 4, "date": "1/30/2018", "effort": "4:18" },
  { "id": 5, "date": "1/2/2018", "effort": "8:45" },
  { "id": 6, "date": "1/7/2018", "effort": "12:23" },
  { "id": 7, "date": "1/14/2018", "effort": "10:19" },
  { "id": 8, "date": "1/8/2018", "effort": "6:04" },
  { "id": 9, "date": "1/11/2018", "effort": "10:40" },
  { "id": 10, "date": "1/23/2018", "effort": "12:06" },
  { "id": 11, "date": "1/3/2018", "effort": "11:49" },
  { "id": 12, "date": "1/16/2018", "effort": "4:45" },
  { "id": 13, "date": "1/10/2018", "effort": "7:48" },
  { "id": 14, "date": "1/9/2018", "effort": "8:59" },
  { "id": 15, "date": "1/26/2018", "effort": "11:02" },
  { "id": 16, "date": "1/19/2018", "effort": "4:33" },
  { "id": 17, "date": "1/29/2018", "effort": "5:43" },
  { "id": 18, "date": "1/6/2018", "effort": "5:42" },
  { "id": 19, "date": "1/4/2018", "effort": "11:45" },
  { "id": 20, "date": "1/29/2018", "effort": "1:58" },
  { "id": 21, "date": "1/25/2018", "effort": "8:11" },
  { "id": 22, "date": "1/5/2018", "effort": "9:07" },
  { "id": 23, "date": "1/24/2018", "effort": "8:12" }]

const DaysTable = (props) => (
  <div>
      <Table compact='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Datum</Table.HeaderCell>
            <Table.HeaderCell>Aufwand</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Arbeit erfassen</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {days.map((day) => {
            return (
              <Table.Row key={day.id}>
                <Table.Cell>{day.date}</Table.Cell>
                <Table.Cell>{day.effort}</Table.Cell>
                <Table.Cell>
                  <Icon name="checkmark" size="large" />
                </Table.Cell>
                <Table.Cell>
                </Table.Cell>
              </Table.Row>
            )
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
  </div>
)

export default DaysTable