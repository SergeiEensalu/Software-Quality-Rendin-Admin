import React, {Component} from "react";
import Collapse from "react-bootstrap/Collapse";
import {Input} from "reactstrap";
import checkData, {getFormattedDate, updateDataInCollection} from "../../../utils/Functions";
import edit_pic from "../../../utils/pictures/edit_button.png";
import Button from "react-bootstrap/Button";
import {bindActionCreators} from "redux";
import {UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST, UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST} from "../../../actions";
import {connect} from "react-redux";

class Conditional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: props.metadata,
            contractOrigin: props.metadata,
            isDisabledMode: true,
            isConditionalCollapsOpen: this.props.open,

            // errors
            petsAllowedError: null,
            numberOfKeySetsError: null,
            petsCommentError: null,
            specialNotesError: null,
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
        this.convertToBoolean = this.convertToBoolean.bind(this);
        this.convertToNumber = this.convertToNumber.bind(this);
    }

    convertToBoolean(promise, fiendName, errorField) {
        if (promise === true || promise === false) {
            this.setState(prevState => ({
                    contract: {...prevState.contract, [fiendName]: promise === true},
                    [errorField]: null
                })
            );
        } else {
            this.setState({
                [errorField]: promise
            })
        }
    }

    saveCloseButton(isDisableMode) {
        return (
            <div>
                {(!isDisableMode) &&
                <div className="row">
                    <div className="col-md-9">
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

    changeEditMode() {
        this.setState({
            isDisabledMode: !this.state.isDisabledMode
        });
        this.resetState();
        this.resetStateErrors();
    }

    resetStateErrors() {
        this.setState({
            petsAllowedError: null,
            numberOfKeySetsError: null,
            petsCommentError: null,
            specialNotesError: null,
        })
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
            isConditionalCollapsOpen: !this.state.isConditionalCollapsOpen,
            isDisabledMode: true
        });

        if (this.state.isConditionalCollapsOpen) {
            this.resetState();
            this.resetStateErrors();
        }
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

    updateContract = async event => {
        event.preventDefault();

        await this.resetStateErrors();
        this.setState({
            petsCommentError: checkData(this.state.contract.petsComment, this.state.contractOrigin.petsComment, false, false, false, false, false),
            specialNotesError: checkData(this.state.contract.specialNotes, this.state.contractOrigin.specialNotes, false, false, false, false, false),
        });

        const petsAllowedData = await checkData(this.state.contract.petsAllowed, this.state.contractOrigin.petsAllowed, true, false, false, false, true);
        await this.convertToBoolean(petsAllowedData, "petsAllowed", "petsAllowedError");

        const numberOfKeySetsData = checkData(this.state.contract.numberOfKeySets, this.state.contractOrigin.numberOfKeySets, true, true, false, false, false);
        await this.convertToNumber(numberOfKeySetsData, "numberOfKeySets", "numberOfKeySetsError");

        if (!this.state.petsAllowedError && !this.state.specialNotesError && !this.state.petsCommentError && !this.state.numberOfKeySetsError) {

            this.setState({
                isDisabledMode: true,
                contractOrigin: this.state.contract
            });
            updateDataInCollection("agreements", this.state.contract.id, this.state.contract);
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
                                value={(this.state.contract[fieldName] !== "undefined" && this.state.contract[fieldName] !== "null" && this.state.contract[fieldName] !== null &&  this.state.contract[fieldName] !== undefined) ?
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
                                value={(this.state.contract[fieldName] !== "undefined" && this.state.contract[fieldName] !== "null" && this.state.contract[fieldName] !== null &&  this.state.contract[fieldName] !== undefined) ?
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

    render() {
        return (
            <div>
                <br/>
                <div className="card">
                    <div className="bg-primary text-white card-header"
                         onClick={() => this.setCollapsOpen()}>
                        <h4 className="title">Special terms</h4>
                    </div>
                    <Collapse in={this.state.isConditionalCollapsOpen}>
                        <div className="card-body">
                            <form onSubmit={this.updateContract}>
                                {this.editModeButton(this.state.isDisabledMode)}
                                <div className="row">
                                    <div className="col-md-6">
                                        {this.inputForm("Pets allowed", "petsAllowed", "petsAllowedError", this.state.isDisabledMode, false)}
                                    </div>
                                    <div className="col-md-6">
                                        {this.inputForm("Number of key set", "numberOfKeySets", "numberOfKeySetsError", this.state.isDisabledMode, false)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        {this.inputForm("Pets comment", "petsComment", "petsCommentError", this.state.isDisabledMode, false)}
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md">
                                        {this.inputForm("Special notes", "specialNotes", "specialNotesError", this.state.isDisabledMode, false)}
                                    </div>
                                </div>
                                {this.saveCloseButton(this.state.isDisabledMode)}
                            </form>
                        </div>
                    </Collapse>
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

export default connect(mapStateToProps, matchDispatchToProps)(Conditional);