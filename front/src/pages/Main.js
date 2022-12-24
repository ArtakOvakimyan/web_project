import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import MenuBar from "../components/MenuBar";
import NewsList from "../components/NewsList";

const Main = () => {
    return (
        <Container style={
            {
                top:'100px',
                position:"relative"
            }
        }>
            <Row>
                <Col md={3}>
                    <MenuBar/>
                </Col>
                <Col md={9}>
                    <NewsList/>
                </Col>
            </Row>
        </Container>
    );
};

export default Main;