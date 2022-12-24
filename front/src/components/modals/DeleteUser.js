import React, {useState} from 'react';
import {Button, Form, FormControl, Modal} from "react-bootstrap";
import {deleting} from "../../http/userApi";

const DeleteUser = ({show, onHide}) => {
    const [username, setUsername] = useState('');
    const click = async() => {
        let response;
        try {
            response = await deleting(username);
            const {data} = JSON.parse(JSON.stringify(response));
            alert(data.message);
        }
        catch (e) {
            alert(e);
        }
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление пользователя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormControl
                        onChange={e => setUsername(e.target.value)}
                        placeholder={"Введите логин пользователя"}
                    >
                    </FormControl>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={click}>Удалить</Button>
                <Button variant={"outline"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteUser;