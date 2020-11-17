import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {ADD_AGREEMENT_TO_OPEN_LIST} from "../../../actions";
import {connect} from "react-redux";
import Agreement from "../../agreement/Agreement";

class Agreements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openAgreements: this.props.openContractsList
        };
    }


    render() {
        return (
            <div>
                {this.props.openContractsList.map((contract) => (
                    <div key={contract.id}>
                        <br/>
                        <Agreement metadata={contract}/>
                    </div>
                ))
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        agreementItemsList: state.agreementItemsList,
        openContractsList: state.openContractsList

    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        addAgreementToOpenList: ADD_AGREEMENT_TO_OPEN_LIST
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Agreements);
