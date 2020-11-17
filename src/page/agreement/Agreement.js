import React, {Component} from "react";
import Apartment from "./component/Apartment";
import Term from "./component/Term";
import Payment from "./component/Payment";
import Services from "./component/Services";
import CoTenant from "./component/CoTenant";
import {findCollection, updateDataInCollection} from "../../utils/Functions"
import Conditional from "./component/Conditional";
import Collapse from "react-bootstrap/Collapse";
import {bindActionCreators} from "redux";
import {
    DELETE_CONTRACT_FROM_LIST,
    UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST,
    UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST
} from "../../actions";
import {connect} from "react-redux";
import close_button from "../../utils/pictures/close_button.png";
import Table from "react-bootstrap/Table";

class Agreement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: this.props.metadata,
            tenant: null,
            landlord: null,
            creator: null,
            isCollapsOpen: true,
            selectedStatus: ''
        };


        // get id from URL : this.props.match.params.id
        this.resolvePromise(findCollection('profiles', "id", "==", this.state.contract.tenantProfileId), "tenant");
        this.resolvePromise(findCollection('profiles', "id", "==", this.state.contract.landlordProfileId), "landlord");
        this.resolvePromise(findCollection('profiles', "id", "==", this.state.contract.creatorProfileId), "creator");

        this.setOpen = this.setOpen.bind(this);
        this.updateContractStatus = this.updateContractStatus.bind(this);

    };

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            contract: props.metadata
        });
    }

    createAddress(addressFirstLine, addressCity, addressCountry) {
        addressFirstLine = (addressFirstLine) ? addressFirstLine + ", " : "street, ";
        addressCity = (addressCity) ? addressCity + ", " : "city, ";
        addressCountry = (addressCountry) ? addressCountry : "country";
        return addressFirstLine + addressCity + addressCountry;
    }

    async resolvePromise(data, role) {
        await Promise.resolve(data).then(promise => {
            if (role === "tenant") {
                this.setState({
                    tenant: promise[0]
                })
            } else if (role === "landlord") {
                this.setState({
                    landlord: promise[0]
                })
            } else if (role === "creator") {
                this.setState({
                    creator: promise[0]
                })
            } else if (role === "contract") {
                this.setState({
                    contract: promise[0]
                })
            }
        })
    }

    setOpen() {
        this.setState({
            isCollapsOpen: !this.state.isCollapsOpen,
        });
    }

    closeContract(contract) {
        this.props.deleteContractFromList(contract);
    }

    drowTableData(profile, type) {
        return (
            <tr>
                <td>{type}</td>
                <td>{(profile.firstName) ? profile.firstName :
                    "undefined"}
                    {" "}
                    {(profile.lastName) ? profile.lastName :
                        "undefined"}</td>
                <td> {(profile.phoneNumber) ? profile.phoneNumber :
                    <div className="text-danger">undefined</div>}</td>
                <td> {(profile.email) ? profile.email :
                    <div className="text-danger">undefined</div>}</td>
                <td> {(profile.personalIdCode) ? profile.personalIdCode :
                    <div className="text-danger">undefined</div>}</td>

                <td> {(profile.userProfileId) ? profile.userProfileId :
                    <div className="text-danger">undefined</div>}</td>
            </tr>
        )
    }

    async updateContractStatus() {

        if (this.state.selectedStatus !== '') {

            await this.setState(prevState => ({
                    contract: {...prevState.contract, 'status': this.state.selectedStatus}
                })
            );

            updateDataInCollection("agreements", this.state.contract.id, this.state.contract);
            this.props.UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST(this.state.contract);
            this.props.UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST(this.state.contract);
            this.setState({
                selectedStatus: '',
            });
        }
    }


    render() {

        const data = [{value: "DRAFT", name: "DRAFT"},
            {value: "IN_REVIEW", name: "IN REVIEW"},
            {value: "READY_TO_SIGN", name: "READY TO SIGN"},
            {value: "SIGNED", name: "SIGNED"},
            {value: "ACTIVE", name: "ACTIVE"},
            {value: "FINISHED", name: "FINISHED"},
            {value: "ARCHIVED", name: "ARCHIVED"}
        ];

        return (
            <div>
                <div>
                    <div className="card">
                        <div className="bg-dark text-white card-header"
                             onClick={() => this.setOpen()}
                             aria-controls="example-collapse-text">
                            <div className="row">
                                <h4 className="m-lg-auto">
                                    {this.state.contract.agreementId && this.state.contract.agreementId}
                                </h4>
                                <h4 className="align-items-center">
                                    {" " + this.createAddress(this.state.contract.addressFirstLine, this.state.contract.addressCity, this.state.contract.addressCountry) + " "}
                                </h4>
                                <h4 className="m-lg-auto">
                                    Status: {this.state.contract.status ? this.state.contract.status :
                                    <div className="text-danger"> undefined </div>}
                                </h4>
                                <img href="/profile" className="align-items-end" width={30} height={30}
                                     onClick={() => this.closeContract(this.state.contract)}
                                     src={close_button}
                                     alt="logo"/>
                            </div>
                        </div>
                        <Collapse in={this.state.isCollapsOpen}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 mx-auto">
                                        {(this.state.contract) &&
                                        <div>
                                            <Term metadata={this.state.contract} open={true}/>
                                            <Payment metadata={this.state.contract} open={true}/>
                                            <CoTenant metadata={this.state.contract} open={false}/>
                                            <Services metadata={this.state.contract} open={false}/>
                                        </div>
                                        }
                                    </div>
                                    <div className="col-md-5 mx-auto">
                                        {(this.state.contract) &&
                                        <div>
                                            <br/>

                                            <Table striped bordered hover responsive variant="light">
                                                <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>Role</th>
                                                    <th>Full name</th>
                                                    <th>Phone number</th>
                                                    <th>Email</th>
                                                    <th>Personal code</th>
                                                    <th>Profile code</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {(this.state.tenant) && this.drowTableData(this.state.tenant, "Tenant")}
                                                {(this.state.landlord) && this.drowTableData(this.state.landlord, "Landlord")}
                                                {(this.state.creator) && this.drowTableData(this.state.creator, "Creator")}
                                                </tbody>
                                            </Table>
                                            <Apartment metadata={this.state.contract} open={true}/>
                                            <Conditional metadata={this.state.contract} open={false}/>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        openContractsList: state.openContractsList,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteContractFromList: DELETE_CONTRACT_FROM_LIST,
        UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST: UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST,
        UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST: UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST

    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Agreement);