import React from "react";
import { Button, Icon, Popup, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
const DaysTable = props => (
  <Table compact="very" unstackable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Datum</Table.HeaderCell>
        <Table.HeaderCell>Aufwand</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Aktionen</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.daysOfEffort.map(day => {
        return (
          <Table.Row key={day.id}>
            <Table.Cell>{day.date}</Table.Cell>
            <Table.Cell>{day.effort}</Table.Cell>
            <Table.Cell>
              <Icon name="checkmark" size="large" color="green" />
            </Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Popup
                  trigger={
                    <Button
                      icon
                      as={Link}
                      to="/create"
                      onClick={props.handleRegisterDailyWork.bind(
                        this,
                        day.date
                      )}
                    >
                      <Icon name="add" />
                    </Button>
                  }
                  content="Aufwand erfassen"
                />
                <Popup
                  trigger={
                    <Button
                      toggle
                      icon
                      active={props.travelDates.find(travelDate => {
                        return travelDate === day.date;
                      })}
                      onClick={props.handleToggleTravel.bind(this, day.date)}
                    >
                      <Icon name="travel" />
                    </Button>
                  }
                  content="Geschäftsreise"
                />
                <Popup
                  trigger={
                    <Button
                      toggle
                      icon
                      active={props.leaveDates.find(leaveDate => {
                        return leaveDate === day.date;
                      })}
                      onClick={props.handleToggleLeave.bind(this, day.date)}
                    >
                      <Icon name="plane" />
                    </Button>
                  }
                  content="Urlaubstag"
                />
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>{props.monthlyAmountOfEffort}</Table.HeaderCell>
        <Table.HeaderCell />
        <Table.HeaderCell />
      </Table.Row>
    </Table.Footer>
  </Table>
);

export default DaysTable;
