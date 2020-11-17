import React, {Component} from "react";
import Collapse from "react-bootstrap/Collapse";
import {Input} from "reactstrap";
import edit_pic from "../../../utils/pictures/edit_button.png";
import checkData, {getFormattedDate, isNumber, updateDataInCollection} from "../../../utils/Functions";
import BackgroundCheck from "./BackgroundCheck";
import Button from "react-bootstrap/Button";
import {bindActionCreators} from "redux";
import {UPDATE_PROFILE_DATA} from "../../../actions";
import {connect} from "react-redux";

class Person extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contract: props.metadata,
            contractOrigin: props.metadata,
            isColored: props.isInContract,
            isDisabledMode: true,
            isCollapsOpen: this.props.open,
            isSaveButtonDisable: false,

            // errors
            firstNameError: null,
            lastNameError: null,
            emailError: null,
            personalCodeError: null,
            countryCodeError: null,
            phoneNumberError: null,
            addressfirstLineError: null,
            addressCityError: null,
            addressCountryError: null,
            addressIndexError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.setOpen = this.setOpen.bind(this);
        this.restartData = this.restartData.bind(this);
        this.updateContract = this.updateContract.bind(this);
        this.resetAllErrors = this.resetAllErrors.bind(this);
        this.inputForm = this.inputForm.bind(this);
        this.editModeButton = this.editModeButton.bind(this);
        this.saveCloseButton = this.saveCloseButton.bind(this);
        this.validation = this.validation.bind(this);
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({
            isCollapsOpen: newProps.open
        })
    }

    changeEditMode() {
        this.setState({
            isDisabledMode: !this.state.isDisabledMode
        });
        this.restartData();
        this.resetAllErrors();
    }

    restartData() {
        this.setState({
            contract: this.state.contractOrigin
        })
    }

    handleChange(e) {
        this.setState({
            isSaveButtonDisable: false
        });

        e.persist();
        let value = e.target.value;
        let name = e.target.name;

        this.setState(prevState => ({
                contract: {...prevState.contract, [name]: value}
            })
        );
    }


    setOpen() {
        this.setState({
            isCollapsOpen: !this.state.isCollapsOpen,
            isDisabledMode: true
        });

        if (this.state.isCollapsOpen) {
            this.restartData();
            this.resetAllErrors();
        }
    }

    resetAllErrors() {
        this.setState({
            firstNameError: null,
            lastNameError: null,
            emailError: null,
            personalCodeError: null,
            profileCodeError: null,
            countryCodeError: null,
            phoneNumberError: null,
            addressfirstLineError: null,
            addressCityError: null,
            addressCountryError: null,
            addressIndexError: null
        })
    }

    validation(data, errorName, isEmpty, isNum, isString, isEmail) {
        if (isEmpty) {
            if (data === "") {
                this.setState({
                    [errorName]: "Can't be empty"
                });
                return;
            }
        }

        if (isNum) {
            if (!isNumber(data)) {
                this.setState({
                    [errorName]: "Must be a number"
                });
                return;
            }
        }

        if (isString) {
            var isContainNumber = /\d/;
            if (isContainNumber.test(data)) {
                this.setState({
                    [errorName]: "Can't contains numbers"
                });
                return;
            }
        }

        if (isEmail) {
            const validator = require("email-validator");
            if (!validator.validate(data)) {
                this.setState({
                    [errorName]: "Can't be an email"
                });
            }
        }
    }

    updateContract = async event => {
        event.preventDefault();

        await this.resetAllErrors();

        this.setState({
            firstNameError: checkData(this.state.contract.firstName, this.state.contractOrigin.firstName, true, false, true, false, false),
            lastNameError: checkData(this.state.contract.lastName, this.state.contractOrigin.lastName, true, false, true, false, false),
            emailError: checkData(this.state.contract.email, this.state.contractOrigin.email, true, false, false, true, false),
            personalCodeError: checkData(this.state.contract.personalIdCode, this.state.contractOrigin.personalIdCode, true, true, false, false, false),
            countryCodeError: checkData(this.state.contract.phoneCountryCode, this.state.contractOrigin.phoneCountryCode, true, true, false, false, false),
            phoneNumberError: checkData(this.state.contract.phoneNumber, this.state.contractOrigin.phoneNumber, true, true, false, false, false),
            addressfirstLineError: checkData(this.state.contract.addressFirstline, this.state.contractOrigin.addressFirstline, true, false, false, false, false),
            addressCityError: checkData(this.state.contract.addressCity, this.state.contractOrigin.addressCity, true, false, true, false, false),
            addressCountryError: checkData(this.state.contract.addressCountry, this.state.contractOrigin.addressCountry, true, false, true, false, false),
            addressIndexError: checkData(this.state.contract.addressPostalCode, this.state.contractOrigin.addressPostalCode, true, false, false, false, false),


        });

        if (!this.state.firstNameError && !this.state.lastNameError && !this.state.emailError && !this.state.personalCodeError &&
            !this.state.countryCodeError && !this.state.phoneNumberError && !this.state.addressfirstLineError && !this.state.addressCityError &&
            !this.state.addressCountryError && !this.state.addressIndexError) {

            this.setState({
                isDisabledMode: true,
                contractOrigin: this.state.contract
            });
            updateDataInCollection("profiles", this.state.contract.id, this.state.contract)
            this.props.UPDATE_SELECTED_PROFILE_DATA(this.state.contract);
        }
    };

    editModeButton(isDisableMode) {
        return (
            <div>
                {(isDisableMode) &&
                <div className="row">
                    <div className="col-md-11">
                    </div>
                    <img href="/profile" width={20} height={20} onClick={this.changeEditMode}
                         src={edit_pic}
                         alt="logo"/>
                </div>
                }
            </div>
        )
    }

    saveCloseButton(isDisableMode) {
        return (
            <div>
                {(!isDisableMode) &&
                <div className="row">
                    <div className="col-md-10">
                    </div>
                    <div className="col-md-auto">
                        <Button className="btn-lg" type="submit" disabled={this.state.isSaveButtonDisable}>Save</Button>
                    </div>
                    <div className="col-md-auto">
                        <Button className="btn-lg bg-danger border-danger" onClick={this.changeEditMode}>Cancel</Button>
                    </div>
                </div>
                }
            </div>
        )
    }

    inputForm(label, fieldName, errorField, disable, isDate) {
        return (
            <div>
                <br/>
                <div className="form-group">
                    {this.state[errorField] ?
                        <div><label className="h5 text-danger">{label} ({this.state[errorField]})</label>
                            <Input
                                className="form-control border-danger"
                                value={(this.state.contract[fieldName]) ?
                                    (isDate) ? getFormattedDate(this.state.contract[fieldName]) :
                                        this.state.contract[fieldName] : ""}
                                bsSize="lg"
                                onChange={this.handleChange}
                                type="text" name={fieldName}
                                disabled={disable}/>
                        </div> :
                        <div>
                            <label>{label}</label>
                            <Input
                                className="form-control"
                                value={(this.state.contract[fieldName]) ?
                                    (isDate) ? getFormattedDate(this.state.contract[fieldName]) :
                                        this.state.contract[fieldName] : ""}
                                bsSize="lg"
                                onChange={this.handleChange}
                                type="text" name={fieldName}
                                disabled={disable}/>
                        </div>
                    }
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-header bg-info text-white"
                         onClick={() => this.setOpen()}
                         aria-controls="example-collapse-text"
                    >
                        <h4 className="title">
                            {((this.state.contractOrigin.firstName)
                                ? this.state.contractOrigin.firstName : "Firstname") + " " +
                            ((this.state.contractOrigin.lastName)
                                ? this.state.contractOrigin.lastName :
                                "Lastname")
                            }
                        </h4>
                    </div>
                    <Collapse in={this.state.isCollapsOpen}>
                        <div className="card-body bg-white text-dark" id="example-collapse-text">
                            <form onSubmit={this.updateContract}>
                                {(this.state.isColored) && this.editModeButton(this.state.isDisabledMode)}
                                <div className="row">
                                    <div className="col-md-3 pr-1">
                                        {this.inputForm("First name", "firstName", "firstNameError", this.state.isDisabledMode, false)}
                                    </div>
                                    <div className="col-md-3 pr-1">
                                        {this.inputForm("Last name", "lastName", "lastNameError", this.state.isDisabledMode, false)}
                                    </div>
                                    <div className="col-md-6 pr-1">
                                        {this.inputForm("Email", "email", "emailError", this.state.isDisabledMode, false)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 pr-1">
                                        {this.inputForm("Profile code", "personalIdCode", "personalCodeError", this.state.isDisabledMode, false)}
                                    </div>
                                    <div className="col-md-4 pr-1">
                                        {this.inputForm("Profile code", "userProfileId", "profileCodeError", true, false)}
                                    </div>
                                    <div className="col-md-4 pr-1">
                                        {this.inputForm("Created", "created", null, true, true)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 pr-1">
                                        {this.inputForm("Country code", "phoneCountryCode", "countryCodeError", this.state.isDisabledMode)}
                                    </div>
                                    <div className="col-md-3 pr-1">
                                        {this.inputForm("Phone number", "phoneNumber", "phoneNumberError", this.state.isDisabledMode)}
                                    </div>

                                    <div className="col-md-6 pr-1">
                                        <label>Background check</label>
                                        {(this.state.contract) &&
                                        <BackgroundCheck metadata={this.state.contract.backgroundChecks} open={false}/>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        {this.inputForm("Address", "addressFirstline", "addressfirstLineError", this.state.isDisabledMode)}
                                    </div>
                                    <div className="col-md-3">
                                        {this.inputForm("City", "addressCity", "addressCityError", this.state.isDisabledMode)}
                                    </div>
                                    <div className="col-md-3">
                                        {this.inputForm("Country", "addressCountry", "addressCountryError", this.state.isDisabledMode)}
                                    </div>
                                    <div className="col-md-3">
                                        {this.inputForm("Index", "addressPostalCode", "addressIndexError", this.state.isDisabledMode)}
                                    </div>
                                </div>
                                {this.saveCloseButton(this.state.isDisabledMode)}
                            </form>
                        </div>
                    </Collapse>
                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    return {
        profile: state.selectedProfile,
        contractsList: state.openContractsList
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        UPDATE_SELECTED_PROFILE_DATA: UPDATE_PROFILE_DATA,
    }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Person);