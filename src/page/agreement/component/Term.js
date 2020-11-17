import React, {Component} from "react";
import {updateDataInCollection} from "../../../utils/Functions"
import {Input} from "reactstrap";
import edit_pic from "../../../utils/pictures/edit_button.png";
import Button from "react-bootstrap/Button";
import {bindActionCreators} from "redux";
import {UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST, UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST} from "../../../actions";
import {connect} from "react-redux";
import {DateTime} from 'react-datetime-bootstrap';
import moment from "moment";
import firebase from 'firebase/app'

class Term extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: props.metadata,
            contractOrigin: props.metadata,
            isDisabledMode: true,
            isTermCollapsOpen: this.props.open
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.setCollapsOpen = this.setCollapsOpen.bind(this);
        this.resetState = this.resetState.bind(this);
        this.updateContract = this.updateContract.bind(this);
        this.getDate = this.getDate.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }

    changeEditMode() {
        this.setState({
            isDisabledMode: !this.state.isDisabledMode
        });
        this.resetState()
    }

    resetState() {
        this.setState({
            contract: this.state.contractOrigin
        })
    }

    handleChange(e) {
        e.persist();
        let value = e.target.value;
        let name = e.target.name;

        this.setState(prevState => ({
                contract: {...prevState.contract, [name]: value}
            })
        );
    }

    setCollapsOpen() {
        this.setState({
            isTermCollapsOpen: !this.state.isTermCollapsOpen,
            isDisabledMode: true
        });

        if (this.state.isTermCollapsOpen) {
            this.resetState()
        }
    }

    updateContract() {
        this.setState({
            isDisabledMode: true,
            contractOrigin: this.state.contract
        });


        updateDataInCollection("agreements", this.state.contract.id, this.state.contract);
        this.props.UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST(this.state.contract);
        this.props.UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST(this.state.contract);
    }


    handleDate(data, name) {
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date(data));

        this.setState(prevState => ({
                contract: {...prevState.contract, [name]: timestamp}
            })
        );
    };

    inputForm(name, isDate) {
        return (
            <div>
                {(isDate) ?
                    <DateTime pickerOptions={{format: "LL"}} onChange={moment => this.handleDate(moment, name)}
                              value={(this.state.contract[name]) ? this.getDate(this.state.contract[name]) : ""}
                              name={name} type="date"
                              disabled={this.state.isDisabledMode}/>
                    : <div>
                        <Input className="form-control"
                               value={(this.state.contract[name]) ? this.state.contract[name] : ""}
                               onChange={this.handleChange}
                               type="text" name={name}
                               disabled={true}
                            //   disabled={this.state.isDisabledMode}
                        />
                    </div>
                }
            </div>

        )
    }

    getDate(timestamp) {
        if (timestamp) {
            const date = new Date(timestamp.seconds * 1000);
            return moment((date.getFullYear() + '-'
                + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
                + ('0' + date.getDate()).slice(-2)), "YYYY-MM-DD");
        } else {
            return '';
        }
    }

    /*
     <div className="bg-primary text-white card-header"
                         onClick={() => this.setCollapsOpen()}
                         aria-controls="example-collapse-text">
                        <h4 className="title">Term of the lease</h4>
                    </div>
                    <Collapse in={this.state.isTermCollapsOpen}>
     */
    render() {
        return (
            <div>
                <br/>
                <div className="card">
                    <div className="card-body" id="example-collapse-text">
                        <form>
                            {(this.state.isDisabledMode) &&
                            <div className="row">
                                <div className="col-md-11">
                                    <h4>Term of the lease</h4>
                                </div>
                                <img href="/profile" width={20} height={20} onClick={this.changeEditMode}
                                     src={edit_pic}
                                     alt="logo"/>
                            </div>
                            }
                            <div className="row">
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>Start date</label>
                                        {this.inputForm("startDate", true)}
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>End date</label>
                                        {this.inputForm("endDate", true)}

                                    </div>
                                </div>
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>Handover</label>
                                        {this.inputForm("handoverDate", true)}

                                    </div>
                                </div>
                                <div className="col-md-2 pr-1">
                                    <div className="form-group">
                                        <label>Type</label>
                                        {this.inputForm("contractType", false)}
                                    </div>
                                </div>
                            </div>
                            {(!this.state.isDisabledMode) &&
                            <div className="row">
                                <div className="col-md-8">
                                </div>
                                <div className="col-md-auto">
                                    <Button className="btn-md" onClick={this.updateContract}>Save</Button>
                                </div>
                                <div className="col-md-auto">
                                    <Button className="btn-md bg-danger border-danger"
                                            onClick={this.changeEditMode}>Cancel</Button>
                                </div>
                            </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps() {
    return {}
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST: UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST,
        UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST: UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Term);