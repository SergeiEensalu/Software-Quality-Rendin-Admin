import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Collapse from "react-bootstrap/Collapse";
import {ADD_AGREEMENT_TO_OPEN_LIST} from "../../../actions";

class AgreementsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agreements: {
                tenant: this.props.agreementItemsList.tenantList,
                landlord: this.props.agreementItemsList.landlordList,
                creator: this.props.agreementItemsList.creatorList
            },
            isAgreementsTableOpen: props.open
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            isAgreementsTableOpen: newProps.open
        })
    }

    async changeOpen(name) {
        this.setState({
            [name]: !this.state[name]
        })
    };

    getAddress = function (addressFirstLine, addressCity, addressCountry) {
        addressFirstLine = (addressFirstLine) ? addressFirstLine + ", " : "street, ";
        addressCity = (addressCity) ? addressCity + ", " : "city, ";
        addressCountry = (addressCountry) ? addressCountry : "country";
        return addressFirstLine + addressCity + addressCountry;
    };

    tableRow(contracts, role) {
        return (
            <tbody>
            {contracts && contracts.map((contract, index) => (
                    <tr key={index} onClick={() => {
                        this.props.addAgreementToOpenList(contract);
                    }}>
                        <td className="h5">{(contract.agreementId) ? contract.agreementId : "undefined"}</td>
                        <th className="h5">{this.getAddress(contract.addressFirstLine, contract.addressCity, contract.addressCountry)}</th>
                        <td className="h6">{(contract.status) ? contract.status.toLowerCase() : ""}</td>
                        <th className="h6">{role}</th>
                    </tr>
                )
            )
            }
            </tbody>
        )
    }

    render() {
        return (
            <div>
                <div className="card table">
                    <div className="bg-info text-white card-header"
                         onClick={() => this.changeOpen("isAgreementsTableOpen")}>
                        <h4>Contracts</h4>
                    </div>
                    <Collapse in={this.state.isAgreementsTableOpen}>
                        <table className="table-bordered table-hover">
                            <thead>
                            <tr>
                                <th scope="col" className="h4">Contract id</th>
                                <th scope="col" className="h4">Address</th>
                                <th scope="col" className="h4">Status</th>
                                <th scope="col" className="h4">Role</th>
                            </tr>
                            </thead>
                            {!(this.state.agreements.length > 0) ?
                                <>
                                    {this.tableRow(this.props.agreementItemsList.tenantList, "tenant")}
                                    {this.tableRow(this.props.agreementItemsList.landlordList, "landlord")}
                                    {this.tableRow(this.props.agreementItemsList.creatorList, "creator")}
                                </> :
                                <div>
                                    No contracts found
                                </div>
                            }
                        </table>
                    </Collapse>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        agreementItemsList: state.agreementItemsList
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addAgreementToOpenList: ADD_AGREEMENT_TO_OPEN_LIST
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AgreementsTable);
