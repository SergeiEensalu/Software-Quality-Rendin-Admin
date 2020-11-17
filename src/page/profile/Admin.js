import React, {Component} from 'react';
import '../login/Login';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "reactstrap";
import NavBar from '../../utils/NavBar.js'
import '../../index.css'
import SideNavPage from "../../utils/SideBar";
import ProfilesList from "./compoment/ProfilesList";
import UserView from "./compoment/ProfileView";
import TaskView from "./compoment/TaskView";
import Search from "./compoment/Search";
import ClientsList from "./compoment/ClientsList";


class Admin extends Component {
    //console.log(" this.props.match.params.id", this.props.match.params.id);

    render() {
        return (
            <div>
                <NavBar/>
                <SideNavPage/>
                <div className="align-items-center">
                    <Container>
                        <Search/>
                        <ProfilesList/>
                        <ClientsList/>
                    </Container>
                    <UserView/>
                    <TaskView/>
                </div>
            </div>
        );
    }
}


export default Admin
