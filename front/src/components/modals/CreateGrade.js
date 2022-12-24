import React, {useContext, useState} from 'react';
import {Button, Form, FormControl, Modal} from "react-bootstrap";
import {createGrade} from "../../http/GradesApi";
import {Context} from "../../index";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";

const CreateGrade = ({show, onHide}) => {
    const {classes} = useContext(Context);
    const [username, setUsername] = useState('');
    const [subject, setSubject] = useState('');
    const [value, setValue] = useState('');

    const click = async() => {
        let response;
        try {
            response = await createGrade(username, subject, value);
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
                    Добавление оценки
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{display:"flex", justifyContent:"space-around"}}>
                <Form>
                    <FormControl
                        onChange={e => setUsername(e.target.value)}
                        placeholder={"Логин ученика"}
                    >
                    </FormControl>
                </Form>
                <Form>
                    <FormControl
                        onChange={e => setSubject(e.target.value)}
                        placeholder={"Предмет"}
                    >
                    </FormControl>
                </Form>
                <Form>
                    <FormControl
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Оценка"}
                    >
                    </FormControl>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-light"} style={{color:"green"}} onClick={click}>Добавить</Button>
                <Button variant={"outline"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateGrade;