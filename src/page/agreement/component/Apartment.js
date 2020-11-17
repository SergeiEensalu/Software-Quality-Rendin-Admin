import React, {Component} from "react";
import {Input} from "reactstrap";
import edit_pic from "../../../utils/pictures/edit_button.png";
import Button from "react-bootstrap/Button";
import checkData, {getFormattedDate, updateDataInCollection} from "../../../utils/Functions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST, UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST} from "../../../actions";

class Apartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: props.metadata,
            contractOrigin: props.metadata,
            isDisabledMode: true,
            isApartmentCollapsOpen: this.props.open,

            // errors
            objectAreaError: null,
            numberOfRoomsError: null,
            addressfirstLineError: null,
            addressCityError: null,
            addressCountryError: null,
            addressIndexError: null,
            hasStorageError: null,
            hasParkingError: null
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
    }

    resetStateErrors() {
        this.setState({
            objectAreaError: null,
            numberOfRoomsError: null,
            addressfirstLineError: null,
            addressCityError: null,
            addressCountryError: null,
            addressIndexError: null,
            hasStorageError: null,
            hasParkingError: null
        })
    }

    changeEditMode() {
        this.setState({
            isDisabledMode: !this.state.isDisabledMode
        });
        this.resetState();
        this.resetStateErrors()
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
            isApartmentCollapsOpen: !this.state.isApartmentCollapsOpen,
            isDisabledMode: true
        });

        if (this.state.isApartmentCollapsOpen) {
            this.resetState();
            this.resetStateErrors();
        }
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
            objectAreaError: checkData(this.state.contract.objectArea, this.state.contractOrigin.objectArea, true, true, false, false, false),
            addressfirstLineError: checkData(this.state.contract.addressFirstLine, this.state.contractOrigin.addressFirstLine, true, false, false, false, false),
            addressCityError: checkData(this.state.contract.addressCity, this.state.contractOrigin.addressCity, true, false, true, false, false),
            addressCountryError: checkData(this.state.contract.addressCountry, this.state.contractOrigin.addressCountry, true, false, true, false, false),
            addressIndexError: checkData(this.state.contract.addressIndex, this.state.contractOrigin.addressIndex, true, false, false, false, false),
        });

        const hasStorageData = await checkData(this.state.contract.hasStorage, this.state.contractOrigin.hasStorage, true, false, false, false, true);
        await this.convertToBoolean(hasStorageData, "hasStorage", "hasStorageError");

        const hasParkingData = await checkData(this.state.contract.hasParking, this.state.contractOrigin.hasParking, true, false, false, false, true);
        await this.convertToBoolean(hasParkingData, "hasParking", "hasParkingError");

        const numberOfRoomsData = checkData(this.state.contract.numberOfRooms, this.state.contractOrigin.numberOfRooms, true, true, false, false, false);
        await this.convertToNumber(numberOfRoomsData, "numberOfRooms", "numberOfRoomsError");

        const objectAreaData = checkData(this.state.contract.objectArea, this.state.contractOrigin.objectArea, true, true, false, false, false);
        await this.convertToNumber(objectAreaData, "objectArea", "objectAreaError");


        if (!this.state.hasStorageError && !this.state.hasParkingError && !this.state.objectAreaError && !this.state.numberOfRoomsError && !this.state.addressfirstLineError && !this.state.addressCityError &&
            !this.state.addressCountryError && !this.state.addressIndexError) {

            this.setState({
                isDisabledMode: true,
                contractOrigin: this.state.contract
            });
            updateDataInCollection("agreements", this.state.contract.id, this.state.contract)
            this.props.UPDATE_AGREEMENT_IN_ALL_AGREEMENT_LIST(this.state.contract);
            this.props.UPDATE_ALL_AGREEMENTS_IN_OPEN_AGREEMENTS_LIST(this.state.contract);
        }
    };

    inputForm(label, fieldName, errorField, editMode, isDate) {
        return (
            <div className="col-md-3">
                <div className="form-group">
                    {this.state[errorField] ?
                        <div><label className="h5 text-danger">{label} ({this.state[errorField]})</label>
                            <Input
                                className="form-control border-danger"
                                value={((this.state.contract[fieldName] !== "undefined" && this.state.contract[fieldName] !== "null" && this.state.contract[fieldName] !== null && this.state.contract[fieldName] !== undefined)) ?
                                    (isDate) ? getFormattedDate(this.state.contract[fieldName]) :
                                        this.state.contract[fieldName].toString() : ""}
                                bsSize="lg"
                                onChange={this.handleChange}
                                type="text" name={fieldName}
                                disabled={editMode}/>
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
                                disabled={editMode}/>
                        </div>
                    }
                </div>
            </div>

        )
    }

    editModeButton(isDisableMode) {
        return (
            <div>
                {(isDisableMode) &&
                <div className="row">
                    <div className="col-md-11">
                        <h4>Appartment details</h4>
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

    /*
     <div className="bg-primary text-white card-header"
                             onClick={() => this.setCollapsOpen()}>
                            <h4 className="title">Appartment details (premises)</h4>
                        </div>
                        <Collapse in={this.state.isApartmentCollapsOpen}>
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
                                {this.inputForm("Address", "addressFirstLine", "addressfirstLineError", this.state.isDisabledMode, false)}
                                {this.inputForm("City", "addressCity", "addressCityError", this.state.isDisabledMode, false)}
                                {this.inputForm("Country", "addressCountry", "addressCountryError", this.state.isDisabledMode, false)}
                                {this.inputForm("Index", "addressIndex", "addressIndexError", this.state.isDisabledMode, false)}
                            </div>
                            <div className="row">
                                {this.inputForm("Nr of rooms", "numberOfRooms", "numberOfRoomsError", this.state.isDisabledMode, false)}
                                {this.inputForm("Storage room", "hasStorage", "hasStorageError", this.state.isDisabledMode, false)}
                                {this.inputForm("Parking spot", "hasParking", "hasParkingError", this.state.isDisabledMode, false)}
                                {this.inputForm("Premises size", "objectArea", "objectAreaError", this.state.isDisabledMode, false)}
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

export default connect(mapStateToProps, matchDispatchToProps)(Apartment);

