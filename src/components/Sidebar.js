import React from "react";
import { Header, Menu, Sidebar } from "semantic-ui-react";

const SidebarLeftOverlay = props => (
  <Sidebar
    as={Menu}
    animation="push"
    width="thin"
    visible={props.visible}
    icon="labeled"
    vertical
  >
    {props.records.map(record => {
      return (
        <Menu.Item
          key={record.id}
          name={record.project}
          active={props.activeItem === record.id}
          onClick={props.handleItemClick.bind(this, record.id)}
        >
          <Header as="h4">{record.project}</Header>
          <p>{record.description}</p>
        </Menu.Item>
      );
    })}
  </Sidebar>
);

export default SidebarLeftOverlay;
