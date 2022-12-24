import React from 'react';
import {Card, CardImg, Col, Image} from "react-bootstrap";

const NewsItem = ({news}) => {
    return (
        <Col md={9} >
            <Card style={{width: '100%', marginBottom: '3%', display:'grid', gridTemplateColumns: '1fr 3fr'}}>
                <CardImg style={{height:'100px'}} src={news.img}></CardImg>
                <Card.Text style={{marginLeft:'10px'}}>{news.text}</Card.Text>
            </Card>
        </Col>
    );
};

export default NewsItem;