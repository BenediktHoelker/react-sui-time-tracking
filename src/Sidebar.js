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
    {props.items.map(item => {
      return (
        <Menu.Item
          key={item.id}
          name={item.project}
          active={props.activeItem === item.id}
          onClick={props.handleItemClick.bind(this, item.id)}
        >
          <Header as="h4">{item.project}</Header>
          <p>{item.description}</p>
        </Menu.Item>
      );
    })}
  </Sidebar>
);

export default SidebarLeftOverlay;
