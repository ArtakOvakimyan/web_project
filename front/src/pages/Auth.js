import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, FormControl, FormSelect} from "react-bootstrap";
import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { useNavigate } from 'react-router-dom';

const Auth = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context);
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [role, setRole] = useState('');
    const [userClass, setClass] = useState('');

    const click = async() => {
        try {
            if (isLogin) {
                const data = await login(username, password);
                user.setUser(data);
                user.setIsAuth(true);
                navigate(MAIN_ROUTE);
            }
            else {
                const response = await registration(username, name, surname, patronymic, role, userClass);
                const {data} = JSON.parse(JSON.stringify(response));
                alert(data.message);
            }
        }
        catch (e) {
            alert(e);
        }
    }
    return (
        <Container style={
            {
                top:'100px',
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                position:"relative"
            }
        }>
            {["Gov", "Principles"].includes(user.user.role) && !isLogin || isLogin ?
            <Card style={
                {
                    width: 600,
                    padding: '5%'
                }
            }>
                <h2 style={{margin:"auto"}}>{isLogin ? 'Авторизация': 'Регистрация'}</h2>
                <Form style={{display: 'flex', flexDirection: 'column'}}>
                    <FormControl
                        style={{marginTop: '3%'}}
                        placeholder='Введите логин'
                        onChange={e => setUsername(e.target.value)}
                    />
                    {isLogin ?
                        <FormControl
                            style={{marginTop: '3%'}}
                            placeholder='Введите пароль'
                            onChange={e => setPassword(e.target.value)}
                            type={password}
                        /> : <div></div>
                    }
                    {isLogin ? <div></div> :
                        <FormControl
                            style={{marginTop: '3%'}}
                            placeholder='Имя'
                            onChange={e => setName(e.target.value)}
                        />
                    }
                    {isLogin ? <div></div> :
                        <FormControl
                            style={{marginTop: '3%'}}
                            placeholder='Фамилия'
                            onChange={e => setSurname(e.target.value)}
                        />
                    }
                    {isLogin ? <div></div> :
                        <FormControl
                            style={{marginTop: '3%'}}
                            placeholder='Отчество'
                            onChange={e => setPatronymic(e.target.value)}
                        />
                    }
                    {isLogin ? <div></div> :
                        <FormSelect
                            style={{marginTop: '3%'}}
                            placeholder='Роли'
                            multiple
                            onChange={e => setRole(e.target.value)}
                        >
                            <option defaultValue value="Student">Ученик</option>
                            <option value="Teacher">Учитель</option>
                            <option value="Principal">Директор</option>
                            <option value="Parent">Родитель</option>
                        </FormSelect>
                    }
                    {isLogin ? <div></div> :
                        <FormSelect
                            style={{marginTop: '3%'}}
                            placeholder='Класс'
                            multiple
                            onChange={e => setClass(e.target.value)}
                        >
                            <option defaultValue value="7a">7a</option>
                            <option defaultValue value="8a">8a</option>
                            <option value="ForSeniors">Не ученик</option>
                        </FormSelect>
                    }
                    <div style={
                        {
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: '3%'
                        }
                    }>
                        {isLogin?
                            <div>
                                Нет аккаунта?
                                    <a href="mailto:name@email.com"
                                       style={{textDecoration:'none'}}>&nbsp;Обратитесь к администратору!
                                    </a>
                            </div>
                            :
                            <div>
                            </div>
                        }
                        <Button onClick={click} variant={"outline-success"}>{isLogin? 'Войти' : 'Зарегистрировать'} </Button>
                    </div>
                </Form>
            </Card> :
                <h2>Недостаточно прав</h2>}
        </Container>
    );
});

export default Auth;