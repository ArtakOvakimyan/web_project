import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import GradeItem from "./GradeItem";

const GradesList = observer(() => {
    const {grades, classes} = useContext(Context);
    return (
        <Row style={{display:'flex', flexDirection:'column'}}>
            {grades.grades.map(g => <GradeItem key={g.id} grade={g}/>)}
        </Row>
    );
});

export default GradesList;