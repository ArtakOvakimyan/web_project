import React from 'react';
import {Card, Col} from "react-bootstrap";

const NewsItem = ({grade}) => {
    return (
        <Col>
            <Card style={{width: '100%', marginBottom: '1%', display:'grid'}}>
                <Card.Text style={{marginLeft:'10px'}}>{grade.student}, {grade.subject}, {grade.value}</Card.Text>
            </Card>
        </Col>
    );
};

export default NewsItem;