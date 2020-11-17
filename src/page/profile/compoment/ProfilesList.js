import React, {Component} from "react";
import '../../../index.css'
import {bindActionCreators} from "redux";
import {
    ADD_AGREEMENTS_TO_CREATOR_LIST,
    ADD_AGREEMENTS_TO_LANDLORD_LIST,
    ADD_AGREEMENTS_TO_TENANT_LIST,
    ADD_PROFILE_DATA,
    CLEAR_PROFILE_DATA,
    CLEAR_PROFILES_LIST,
    CLEAR_TASKS_FROM_LIST,
    clearAllAgreementFromOpenList
} from "../../../actions";
import {connect} from "react-redux";
import {findCollection} from "../../../utils/Functions";

class ProfilesList extends Component {
    constructor(props) {
        super(props);

        this.updateState = this.updateState.bind(this);
        this.findContractById = this.findContractById.bind(this);
    }

    async updateState(user) {
        this.setState({
            isHidden: true
        });
        this.props.CLEAR_PROFILE_DATA();
        this.props.CLEAR_PROFILES_LIST();
        this.props.CLOSE_OPEN_AGREEMENTS();
        this.props.CLEAR_TASKS_FROM_LIST();

        this.props.ADD_PROFILE(user);
        await this.findContractById("tenantProfileId", user.id);
        await this.findContractById("landlordProfileId", user.id);
        await this.findContractById("creatorProfileId", user.id);
    }

    async findContractById(searchValue, profileId) {
        if (profileId) {
            const userContracts = await findCollection('agreements', searchValue, "==",  profileId);

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
        }
    }

    render() {
        return (
            <div>
                {this.props.foundProfilesList.length > 0 &&
                <div className="card table mt-5">
                    <div className="card-header bg-primary text-white">
                        <h4 className="title">Profiles list</h4>
                    </div>
                    <table className="table-hover table-bordered">
                        <tbody>
                        {this.props.foundProfilesList.map((user = {}) => (
                            <tr className="w-100" key={user.id} onClick={() => {
                                this.updateState(user);
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
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        foundProfilesList: state.foundProfilesList
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        CLEAR_PROFILE_DATA: CLEAR_PROFILE_DATA,
        CLEAR_PROFILES_LIST: CLEAR_PROFILES_LIST,
        ADD_AGREEMENTS_TO_TENANT_LIST: ADD_AGREEMENTS_TO_TENANT_LIST,
        ADD_AGREEMENTS_TO_LANDLORD_LIST: ADD_AGREEMENTS_TO_LANDLORD_LIST,
        ADD_AGREEMENTS_TO_CREATOR_LIST: ADD_AGREEMENTS_TO_CREATOR_LIST,
        CLEAR_TASKS_FROM_LIST: CLEAR_TASKS_FROM_LIST,
        CLOSE_OPEN_AGREEMENTS: clearAllAgreementFromOpenList,
        ADD_PROFILE: ADD_PROFILE_DATA,
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfilesList);