import React from "react";
import { Button, Icon, Popup, Select, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

const monthOptions = [
  { key: "01", value: "01", text: "Januar" },
  { key: "02", value: "02", text: "Februar" },
  { key: "03", value: "03", text: "März" },
  { key: "04", value: "04", text: "April" },
  { key: "05", value: "05", text: "Mai" },
  { key: "06", value: "06", text: "Juni" },
  { key: "07", value: "07", text: "Juli" },
  { key: "08", value: "08", text: "August" },
  { key: "09", value: "09", text: "September" },
  { key: "10", value: "10", text: "Oktober" },
  { key: "11", value: "11", text: "November" },
  { key: "12", value: "12", text: "Dezember" }
];
const DaysTable = props => (
  <div>
    <Select
      options={monthOptions}
      value={props.month}
      onChange={props.loadRecordsOfMonth}
    />
    <Table compact="very">
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
              <Table.Cell
                disabled={
                  !!props.leaveDates.find(leaveDate => {
                    return leaveDate === day.date;
                  })
                }
              >
                {day.date}
              </Table.Cell>
              <Table.Cell
                disabled={
                  !!props.leaveDates.find(leaveDate => {
                    return leaveDate === day.date;
                  })
                }
              >
                {day.effort}
              </Table.Cell>
              <Table.Cell>
                {day.effort !== "0:00:00" ||
                !!props.leaveDates.find(leaveDate => {
                  return leaveDate === day.date;
                }) ? (
                  <Icon name="checkmark" size="large" color="green" />
                ) : (
                  <Icon name="close" size="large" color="red" />
                )}
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
                        disabled={
                          !!props.leaveDates.find(leaveDate => {
                            return leaveDate === day.date;
                          })
                        }
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
                        active={
                          !!props.travelDates.find(travelDate => {
                            return travelDate === day.date;
                          })
                        }
                        onClick={props.handleToggleTravel.bind(this, day.date)}
                        disabled={
                          !!props.leaveDates.find(leaveDate => {
                            return leaveDate === day.date;
                          })
                        }
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
                        active={
                          !!props.leaveDates.find(leaveDate => {
                            return leaveDate === day.date;
                          })
                        }
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
  </div>
);

export default DaysTable;
