import React from 'react';
import {observer} from "mobx-react-lite";
import {Button, ListGroup, TabContainer} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';

const MenuBar = observer(() => {
    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <ListGroup style={{cursor: "pointer"}}>
            <ListGroup.Item>Новости</ListGroup.Item>
            <ListGroup.Item>Тех.поддержка</ListGroup.Item>
            <ListGroup.Item>Чат</ListGroup.Item>
        </ListGroup>
        </Tab.Container>
    );
}) ;

export default MenuBar;