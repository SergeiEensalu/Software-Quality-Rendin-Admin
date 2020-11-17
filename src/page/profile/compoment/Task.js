import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Collapse from "react-bootstrap/Collapse";
import {findCollection, getFormattedDate, getFormattedDateTime, updateDataInCollection} from "../../../utils/Functions";
import {
    ADD_AGREEMENT_TO_OPEN_LIST,
    ADD_AGREEMENTS_TO_CREATOR_LIST,
    ADD_AGREEMENTS_TO_LANDLORD_LIST,
    ADD_AGREEMENTS_TO_TENANT_LIST,
    ADD_PROFILE_DATA,
    ADD_TASKS_TO_LIST,
    CLEAR_PROFILE_DATA,
    CLEAR_TASKS_FROM_LIST, CLOSE_TASK_PAGE,
    DELETE_TASK_FROM_LIST
} from "../../../actions";
import Button from "react-bootstrap/Button";

class Task extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            task: this.props.metadata,
            isTaskOpen: false,
        };

        this.setOpen = this.setOpen.bind(this);
        this.closeTask = this.closeTask.bind(this);
        this.clickedProfile = this.clickedProfile.bind(this);
        this.openContract = this.openContract.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        if (this.state.task.type !== "task") {
            await findCollection("agreements", "id","==", this.state.task.entityId).then(object => {
                    this.setState({
                        contract: object[0]
                    });
                }
            );

            if (this.state.contract !== undefined) {
                await findCollection("profiles", "id", "==", this.state.contract.tenantProfileId).then(object => {
                        this.setState({
                            tenant: object[0]
                        });
                    }
                );

                await findCollection("profiles", "id", "==", this.state.contract.landlordProfileId).then(object => {
                        this.setState({
                            landlord: object[0]
                        });
                    }
                );

                await findCollection("profiles", "id", "==", this.state.contract.creatorProfileId).then(object => {
                        this.setState({
                            creator: object[0]
                        });
                    }
                );
            }
        }
    }

    async closeTask() {
        await this.setState(prevState => ({
                task: {
                    ...prevState.task,
                    closed: new Date(Date.now()),
                    status: 'closed'
                }
            })
        );
        await updateDataInCollection("tasks", this.state.task.id, this.state.task);
        this.props.DELETE_TASK_FROM_LIST(this.state.task.id);
    }

    setOpen() {
        this.setState({
            isTaskOpen: !this.state.isTaskOpen,
        });
    }

    style = {
        width: '75%'
    };


    createAddress(addressFirstLine, addressCity, addressCountry) {
        addressFirstLine = (addressFirstLine) ? addressFirstLine + ", " : "street, ";
        addressCity = (addressCity) ? addressCity + ", " : "city, ";
        addressCountry = (addressCountry) ? addressCountry : "country";
        return addressFirstLine + addressCity + addressCountry;
    }

    clickedProfile(profile) {
        this.findContractById("landlordProfileId", profile.id);
        this.findContractById("tenantProfileId", profile.id);
        this.findContractById("creatorProfileId", profile.id);
        this.props.CLEAR_PROFILE_DATA();
        this.props.ADD_PROFILE(profile);
        this.props.CLEAR_TASKS_FROM_LIST();
        this.props.CLOSE_TASK_PAGE();

    }

    async findContractById(searchValue, profileId) {
        if (profileId) {
            const userContracts = await findCollection('agreements', searchValue,"==", profileId);

            if (userContracts || userContracts.length >= 0) {
                let newContractList = [];

                await Promise.resolve(userContracts).then(promise => {
                    for (const array of promise) {
                        newContractList.push(array)
                    }
                    if (searchValue === "landlordProfileId") {
                        this.props.ADD_AGREEMENTS_TO_LANDLORD_LIST(newContractList);
                    } else if (searchValue === "tenantProfileId") {
                        this.props.ADD_AGREEMENTS_TO_TENANT_LIST(newContractList);
                    } else if (searchValue === "creatorProfileId") {
                        this.props.ADD_AGREEMENTS_TO_CREATOR_LIST(newContractList);
                    }
                });
            }
        } else {
            console.log("profile id is not defined")
        }
    }

    openContract(contract) {
        this.props.ADD_AGREEMENT_TO_OPEN_LIST(contract);
        this.props.CLOSE_TASK_PAGE();
    }


    render() {
        return (
            <div className="w-50">
                <br/>
                {(this.state.task) &&
                <div className="card">
                    <div className="card-header bg-primary text-white"
                         onClick={() => this.setOpen()}
                         aria-controls="example-collapse-text">
                        <h4 className="title">{this.state.task.description}</h4>
                    </div>
                    <Collapse in={this.state.isTaskOpen}>
                        <div className="container">
                            <div className="row">
                                <div className="jumbotron bg-white">
                                    <p className="lead">Created</p>
                                    <h5>{getFormattedDateTime(this.state.task.created)} {getFormattedDate(this.state.task.created)}</h5>
                                </div>

                                <div className="jumbotron bg-white">
                                    <p className="lead">Type</p>
                                    <h5>{this.state.task.type}</h5>
                                </div>

                                <div className="jumbotron bg-white">
                                    <p className="lead">Status</p>
                                    <h5>{this.state.task.status}</h5>
                                </div>

                                {(this.state.contract) &&
                                <>
                                    <div className="jumbotron bg-white">
                                        <p className="lead">{this.state.task.type} id</p>
                                        <Button
                                            onClick={() => this.openContract(this.state.contract)}>{this.state.contract.agreementId}</Button>
                                    </div>
                                    <div className="jumbotron bg-white">
                                        <p className="lead">Agreement address</p>
                                        <h5>{this.createAddress(this.state.contract.addressFirstLine, this.state.contract.addressCity,
                                            this.state.contract.addressCountry)}
                                        </h5>
                                    </div>

                                </>
                                }
                            </div>
                            <div className="row">
                                <div style={this.style} className="jumbotron bg-white">
                                    <h3>Task description</h3>
                                    <p className="lead">{this.state.task.description}</p>
                                </div>
                                {(this.state.contract) &&
                                <div className="card jumbotron bg-white">
                                    <p className="lead">Persons</p>
                                    <table>
                                        <tbody>

                                        {this.state.tenant &&
                                        <tr className="px-5 pt-5">
                                            <td>Tenant</td>
                                            <td><Button
                                                onClick={() => this.clickedProfile(this.state.tenant)}>{this.state.tenant.userProfileId}</Button>
                                            </td>
                                        </tr>
                                        }
                                        {this.state.landlord &&
                                        <tr className="px-5 pt-5">
                                            <td>Landlord</td>
                                            <td><Button
                                                onClick={() => this.clickedProfile(this.state.landlord)}>{this.state.landlord.userProfileId}</Button>
                                            </td>
                                        </tr>
                                        }
                                        {this.state.creator &&
                                        <tr className="px-5 pt-5">
                                            <td>Creator</td>
                                            <td><Button
                                                onClick={() => this.clickedProfile(this.state.creator)}>{this.state.creator.userProfileId}</Button>
                                            </td>
                                        </tr>
                                        }
                                        </tbody>
                                    </table>


                                </div>
                                }

                                <div className="jumbotron bg-white">
                                    <button type="button" className="btn btn-primary btn-lg btn-block"
                                            onClick={this.closeTask}>Complete task
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Collapse>
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ADD_TASKS_TO_LIST: ADD_TASKS_TO_LIST,
        DELETE_TASK_FROM_LIST: DELETE_TASK_FROM_LIST,
        ADD_PROFILE: ADD_PROFILE_DATA,
        CLEAR_PROFILE_DATA: CLEAR_PROFILE_DATA,
        CLEAR_TASKS_FROM_LIST: CLEAR_TASKS_FROM_LIST,
        ADD_AGREEMENTS_TO_TENANT_LIST: ADD_AGREEMENTS_TO_TENANT_LIST,
        ADD_AGREEMENTS_TO_LANDLORD_LIST: ADD_AGREEMENTS_TO_LANDLORD_LIST,
        ADD_AGREEMENTS_TO_CREATOR_LIST: ADD_AGREEMENTS_TO_CREATOR_LIST,
        ADD_AGREEMENT_TO_OPEN_LIST: ADD_AGREEMENT_TO_OPEN_LIST,
        CLOSE_TASK_PAGE: CLOSE_TASK_PAGE
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Task);