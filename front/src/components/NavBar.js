import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Nav, Navbar} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, GRADES_ROUTE, LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    }
    return (
        <Navbar bg="dark" variant="dark" style={
            {
                position: "fixed",
                zIndex: 2,
                width: '100%',
                display: "flex",
                justifyContent: "space-between",
                paddingRight: '2%',
                paddingLeft: '2%',
            }
        }>
            <NavLink style={
                {
                    color: 'white',
                    textDecoration: 'none',
                }
            } to={MAIN_ROUTE}>Сетевой журнал</NavLink>
            {user.isAuth ?
                <Nav style={{color: 'white'}}>
                    {['Gov', 'Principle'].includes(user.user.role) ?
                        <Button variant={"outline-light"}
                                style={{marginLeft: 5}}
                                onClick={() => navigate(ADMIN_ROUTE)}>
                            Админ-панель
                        </Button> : <div></div>
                    }
                    {['Gov', 'Principle', 'Teacher'].includes(user.user.role) ?
                        <Button variant={"outline-light"}
                                style={{marginLeft: 5}}
                                onClick={() => navigate(GRADES_ROUTE)}>
                            Журнал
                        </Button> : <div></div>
                    }
                    <Button
                        variant={"outline-light"}
                        style={{marginLeft:5}}
                        onClick={ () => {
                                logOut();
                                navigate(MAIN_ROUTE);
                            }
                        }>
                        Выйти
                    </Button>
                </Nav>
                :
                <Nav style={
                    {
                        color: 'white',
                        marginRight:'2%'
                    }
                }>
                    <NavLink to={LOGIN_ROUTE}>
                        <Button
                            variant={"outline-light"}
                            onClick={ () => navigate(LOGIN_ROUTE) }>
                            Авторизация
                        </Button>
                    </NavLink>
                </Nav>
            }
        </Navbar>
    );
});

export default NavBar;