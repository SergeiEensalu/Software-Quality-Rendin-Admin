import React, {Component} from "react";
import {bindActionCreators} from "redux";

import {connect} from "react-redux";
import {ADD_CLIENTS_TO_LIST} from "../../../actions";

class ClientsList extends Component {

    render() {
        return (
            <div>
                {(this.props.isPageOpen) &&
                <div>
                    {(this.props.allClientsList.length > 0) ?
                        <div className="card table mt-5">
                            <div className="card-header bg-primary text-white">
                                <h4 className="title">All application accounts</h4>
                            </div>
                            <table className="table-hover table-bordered">
                                <tbody>
                                {this.props.allClientsList.map((user = {}) => (
                                    <tr className="w-100" key={user.id} onClick={() => {
                                     //   this.updateState(user);
                                    }}>
                                        <th className="h4">{(user.firstName) ? user.firstName :
                                            "undefined"}
                                            {" "}
                                            {(user.lastName) ? user.lastName :
                                                "undefined"}</th>
                                        <th className="h4"> {(user.personalIdCode) ? user.personalIdCode :
                                            <div className="text-danger">undefined</div>}</th>

                                        <th className="h4"> {(user.email) ? user.email :
                                            <div className="text-danger">undefined</div>}</th>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div> :
                        <div>
                            no one clients
                        </div>
                    }
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isPageOpen: state.isClientsPageOpen,
        allClientsList: state.allClientsList,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        ADD_CLIENTS_TO_LIST: ADD_CLIENTS_TO_LIST,
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ClientsList);