import React, {Component} from "react";
import {Input} from 'reactstrap';
import checkData, {getFormattedDate, updateDataInCollection} from "../../../utils/Functions";
import edit_pic from "../../../utils/pictures/edit_button.png";
import Button from "react-bootstrap/Button";
import {bindActionCreators} from "redux";
import {UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST, UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST} from "../../../actions";
import {connect} from "react-redux";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: props.metadata,
            contractOrigin: props.metadata,
            isDisabledMode: true,
            isPaymentCollapsOpen: this.props.open,

            // errors
            rentAmountError: null,
            paymentDayError: null,
            currencyError: null,
            bankAccountOwnerNameError: null,
            bankAccountNumberError: null,
            certificateIdError: null,
            insurancePaymentDayError: null,
            insuranceAmountError: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeEditMode = this.changeEditMode.bind(this);
        this.setCollapsOpen = this.setCollapsOpen.bind(this);
        this.resetState = this.resetState.bind(this);
        this.updateContract = this.updateContract.bind(this);
        this.resetStateErrors = this.resetStateErrors.bind(this);
        this.inputForm = this.inputForm.bind(this);
        this.editModeButton = this.editModeButton.bind(this);
        this.saveCloseButton = this.saveCloseButton.bind(this);
        this.convertToNumber = this.convertToNumber.bind(this);
    }

    convertToNumber(promise, fiendName, errorField) {
        if (promise) {
            this.setState({
                [errorField]: promise
            })
        } else {
            this.setState(prevState => ({
                    contract: {...prevState.contract, [fiendName]: Number(this.state.contract[fiendName])},
                    [errorField]: null
                })
            );
        }
    }

    saveCloseButton(isDisableMode) {
        return (
            <div>
                {(!isDisableMode) &&
                <div className="row">
                    <div className="col-md-8">
                    </div>
                    <div className="col-md-auto">
                        <Button className="btn-md" type="submit">Save</Button>
                    </div>
                    <div className="col-md-auto">
                        <Button className="btn-md bg-danger border-danger" onClick={this.changeEditMode}>Cancel</Button>
                    </div>
                </div>
                }
            </div>
        )
    }

    editModeButton(isDisableMode) {
        return (
            <div>
                {(isDisableMode) &&
                <div className="row">
                    <div className="col-md-11">
                        <h4>Payment</h4>
                    </div>
                    <Button onClick={this.changeEditMode} className="bg-white border-white"><img href="/profile"
                                                                                                 width={20} height={20}
                                                                                                 src={edit_pic}
                                                                                                 alt="logo"/></Button>
                </div>
                }
            </div>
        )
    }

    resetStateErrors() {
        this.setState({
            rentAmountError: null,
            paymentDayError: null,
            currencyError: null,
            bankAccountOwnerNameError: null,
            bankAccountNumberError: null,
            certificateIdError: null,
            insurancePaymentDayError: null,
            insuranceAmountError: null
        })
    }

    changeEditMode() {
        this.setState({
            isDisabledMode: !this.state.isDisabledMode
        });
        this.resetState();
        this.resetStateErrors();
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
            isPaymentCollapsOpen: !this.state.isPaymentCollapsOpen,
            isDisabledMode: true
        });

        if (this.state.isPaymentCollapsOpen) {
            this.resetState();
            this.resetStateErrors();
        }
    }

    updateContract = async event => {
        event.preventDefault();
        await this.resetStateErrors();

        this.setState({
            currencyError: checkData(this.state.contract.currency, this.state.contractOrigin.currency, true, false, true, false, false),
            bankAccountOwnerNameError: checkData(this.state.contract.bankAccountOwnerName, this.state.contractOrigin.bankAccountOwnerName, true, false, true, false, false),
            bankAccountNumberError: checkData(this.state.contract.bankAccountNumber, this.state.contractOrigin.bankAccountNumber, true, false, false, false, false),
            certificateIdError: checkData(this.state.contract.certificateId, this.state.contractOrigin.certificateId, true, false, false, false, false),
        });

        const rentAmountData = await checkData(this.state.contract.rentAmount, this.state.contractOrigin.rentAmount, true, true, false, false, false);
        await this.convertToNumber(rentAmountData, "rentAmount", "rentAmountError");

        const paymentDayData = await checkData(this.state.contract.paymentDay, this.state.contractOrigin.paymentDay, true, true, false, false, false);
        await this.convertToNumber(paymentDayData, "paymentDay", "paymentDayError");

        const insurancePaymentDayData = await checkData(this.state.contract.insurancePaymentDay, this.state.contractOrigin.insurancePaymentDay, true, true, false, false, false);
        await this.convertToNumber(insurancePaymentDayData, "insurancePaymentDay", "insurancePaymentDayError");

        const insuranceAmountData = await checkData(this.state.contract.insuranceAmount, this.state.contractOrigin.insuranceAmount, true, true, false, false, false);
        await this.convertToNumber(insuranceAmountData, "insuranceAmount", "insuranceAmountError");

        if (!this.state.rentAmountError && !this.state.paymentDayError &&
            !this.state.bankAccountOwnerNameError && !this.state.bankAccountNumberError &&
            !this.state.bankAccountNumberError && !this.state.certificateIdError &&
            !this.state.insurancePaymentDayError && !this.state.insuranceAmountError) {

            this.setState({
                isDisabledMode: true,
                contractOrigin: this.state.contract
            });
            updateDataInCollection("agreements", this.state.contract.id, this.state.contract)
            this.props.UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST(this.state.contract);
            this.props.UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST(this.state.contract);
        }
    };

    inputForm(label, fieldName, errorField, disable, isDate) {
        return (
            <div>
                <div className="form-group">
                    {this.state[errorField] ?
                        <div><label className="h5 text-danger">{label} ({this.state[errorField]})</label>
                            <Input
                                className="form-control border-danger"
                                value={(this.state.contract[fieldName] !== "undefined" && this.state.contract[fieldName] !== "null" && this.state.contract[fieldName] !== null && this.state.contract[fieldName] !== undefined) ?
                                    (isDate) ? getFormattedDate(this.state.contract[fieldName]) :
                                        this.state.contract[fieldName].toString() : ""}
                                bsSize="lg"
                                onChange={this.handleChange}
                                type="text" name={fieldName}
                                disabled={disable}/>
                        </div> :
                        <div>
                            <label>{label}</label>
                            <Input
                                className="form-control"
                                value={(this.state.contract[fieldName] !== "undefined" && this.state.contract[fieldName] !== "null" && this.state.contract[fieldName] !== null && this.state.contract[fieldName] !== undefined) ?
                                    (isDate) ? getFormattedDate(this.state.contract[fieldName]) :
                                        this.state.contract[fieldName].toString() : ""}
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

    /*
       <div className="bg-primary text-white card-header"
                         onClick={() => this.setCollapsOpen()}>
                        <h4 className="title">Payment</h4>
                    </div>
                    <Collapse in={this.state.isPaymentCollapsOpen}>
     */

    render() {
        return (
            <div>
                <br/>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.updateContract}>
                            {this.editModeButton(this.state.isDisabledMode)}

                            <div className="row">
                                <div className="col-md-3 pr-1">
                                    {this.inputForm("Rental payment", "rentAmount", "rentAmountError", this.state.isDisabledMode, false)}
                                </div>
                                <div className="col-md-3 pr-1">
                                    {this.inputForm("Payment day", "paymentDay", "paymentDayError", this.state.isDisabledMode, false)}
                                </div>
                                <div className="col-md-3 pr-1">
                                    <div className="form-group">
                                        <label>Arrears</label>
                                        <Input type="text" bsSize="lg" value="0,02%" disabled/>
                                    </div>
                                </div>
                                <div className="col-md-3 pr-1">
                                    {this.inputForm("Currency", "currency", "currencyError", this.state.isDisabledMode, false)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 pr-1">
                                    {this.inputForm("Bank account owner name", "bankAccountOwnerName", "bankAccountOwnerNameError", this.state.isDisabledMode, false)}
                                </div>
                                <div className="col-md-6 pr-1">
                                    {this.inputForm("Bank account number", "bankAccountNumber", "bankAccountNumberError", this.state.isDisabledMode, false)}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 pr-1">
                                    {this.inputForm("Certificate number", "certificateId", "certificateIdError", this.state.isDisabledMode, false)}
                                </div>
                                <div className="col-md-4 pr-1">
                                    {this.inputForm("Insurance payment day", "insurancePaymentDay", "insurancePaymentDayError", this.state.isDisabledMode, false)}
                                </div>
                                <div className="col-md-4 pr-1">
                                    {this.inputForm("Insurance amount", "insuranceAmount", "insuranceAmountError", this.state.isDisabledMode, false)}
                                </div>
                            </div>

                            {this.saveCloseButton(this.state.isDisabledMode)}
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

export default connect(mapStateToProps, matchDispatchToProps)(Payment);

