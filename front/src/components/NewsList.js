import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import NewsItem from "./NewsItem";

const NewsList = observer(() => {
    const {news} = useContext(Context);
    return (
        <Row style={{display:'flex', flexDirection:'column'}}>
            {news.articles.map(n => <NewsItem key={n.id} news={n}/>)}
        </Row>
    );
});

export default NewsList;