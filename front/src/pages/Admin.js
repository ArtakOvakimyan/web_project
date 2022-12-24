import React, {useContext, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import DeleteUser from "../components/modals/DeleteUser";
import {REGISTER_ROUTE} from "../utils/consts";
import {Context} from "../index";

const Admin = () => {
    const [deleteVisible, setDeleteVisible] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(Context);
    if (["Gov", "Principles"].includes(user.user.role)) {
        return (
            <Container style={
                {
                    width: "30%",
                    top: '100px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: "stretch",
                    position: "relative",
                    height: 100,
                    flexDirection: 'column'
                }
            }>
                <Button variant={"outline-dark"} onClick={() => navigate(REGISTER_ROUTE)}>Зарегистрировать
                    пользователя</Button>
                <Button variant={"outline-dark"} onClick={() => setDeleteVisible(true)}>Удалить пользователя</Button>
                <DeleteUser show={deleteVisible} onHide={() => setDeleteVisible(false)}/>
            </Container>
        );
    }
    else {
        return <h2>Недостаточно прав</h2>
    }
};

export default Admin;