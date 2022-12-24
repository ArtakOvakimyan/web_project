import React, {useEffect, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {page} from "../http/userApi";

const Person = () => {
    const [person, setPerson] = useState({Name: 'unknown', Surname: 'unknown'});
    const {id} = useParams();
    useEffect( () => {
            page(id).then(data => {setPerson(data)});
        }
    )
    return (
        <Container style={
            {
                top: '100px',
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
            }
        }>
            <Row>
                <h2>Имя: {person.Name}</h2>
                <h2>Фамилия: {person.Surname}</h2>
                <p>Роли: {[person.Role].map(p => `${p} `)}</p>
            </Row>
        </Container>
    );
};

export default Person;