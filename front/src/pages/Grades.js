import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import GradesList from "../components/GradesList";
import CreateGrade from "../components/modals/CreateGrade";
import {Context} from "../index";
import {fetchClasses, fetchGrades} from "../http/GradesApi";
import {observer} from "mobx-react-lite";
import ClassesBar from "../components/ClassesBar";

const Grades = observer(() => {
    const [createVisible, setCreateVisible] = useState(false);
    const {user, grades, classes} = useContext(Context);

    useEffect(() => {
        fetchClasses().then(data => classes.setClasses(data))
        fetchGrades(classes.selectedClass).then(data => grades.setGrades(data))
    }, [classes.selectedClass])
    if (["Gov", "Principles", "Teacher"].includes(user.user.role)) {
        return (
            <Container style={
                {
                    top:'100px',
                    position:"relative"
                }
            }>
                <Row>
                    <Button
                        style={{marginBottom: '10px'}}
                        variant={"outline-dark"}
                        onClick={() => setCreateVisible(true)}
                    >
                        Добавить оценку
                    </Button>
                    <CreateGrade show={createVisible} onHide={() => setCreateVisible(false)}/>
                    <ClassesBar></ClassesBar>
                    <Col>
                        <GradesList/>
                    </Col>
                </Row>
            </Container>
        );
    }
    else {
        return <h2>Недостаточно прав</h2>
    }
});

export default Grades;