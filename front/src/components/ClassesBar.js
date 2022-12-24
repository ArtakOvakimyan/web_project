import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Dropdown} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownItem from "react-bootstrap/DropdownItem";

const BrandBar = observer(() => {
    const {classes} = useContext(Context);

    return (
        <Dropdown style={{marginBottom: '10px'}}>
            <DropdownToggle>
                Класс
            </DropdownToggle>

            <DropdownMenu>
                {classes.classes.map(userClass => userClass.name !== 'ForSeniors' ?
                    <DropdownItem
                        style={{cursor:'pointer', width: '50%', textAlign: 'center'}}
                        key={userClass._id}
                        onClick={() => classes.setSelectedClass(userClass._id)}
                    >
                        {userClass.name}
                    </DropdownItem> : <div></div>
                )}
            </DropdownMenu>
        </Dropdown>
        // <Container className="d-inline-flex" style={{gridTemplateColumns: '300px 1fr'}}>
        //     {classes.classes.map(userClass => userClass.name !== 'ForSeniors' ?
        //         <Card
        //             style={{cursor:'pointer', width: '50%', textAlign: 'center'}}
        //             key={userClass.id}
        //             onClick={() => classes.setSelectedClass(userClass)}
        //             border={userClass.id === classes.selectedClass.id ? 'danger' : 'light'}
        //         >
        //             {userClass.name}
        //         </Card> : <div></div>
        //     )}
        // </Container>
    );
});

export default BrandBar;