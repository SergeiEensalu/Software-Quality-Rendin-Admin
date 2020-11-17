import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {
    ADD_AGREEMENTS_TO_CREATOR_LIST,
    ADD_AGREEMENTS_TO_LANDLORD_LIST,
    ADD_AGREEMENTS_TO_TENANT_LIST,
    ADD_PROFILE_DATA,
    ADD_TASKS_TO_LIST,
    CLEAR_PROFILE_DATA,
    CLEAR_PROFILES_LIST,
    CLEAR_TASKS_FROM_LIST,
    clearAllAgreementFromOpenList
} from "../../../actions";
import {connect} from "react-redux";
import Button from "react-bootstrap/Button";
import Task from "./Task";
import {addHistory, findCollection} from "../../../utils/Functions";

class TaskView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textarea: ''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
    }

    async addTask() {
        if (this.state.textarea.length < 1) {
            console.log("textarea cant be wit size:", this.state.textarea.length);
            return;
        }

        await addHistory("tasks", null, this.state.textarea, null, "task", JSON.parse(localStorage.getItem("authUser")).uid);
        const tasks = await findCollection("tasks", "closed", "==", null);
        await this.props.ADD_TASKS_TO_LIST(tasks);

        this.setState({
            textarea: ''
        })
    }

    handleChangeTextArea(evt) {
        this.setState({textarea: evt.target.value});
    }

    render() {
        return (
            <>
                {(this.props.isTaskOpenPage) &&
                <div className="pt-5 pb-5">
                    <div className="row justify-content-lg-center w-100">
                            <textarea className="form-control w-50 h-auto" name="textarea" placeholder="Write task"
                                      id="textarea" rows="3"
                                      onChange={this.handleChangeTextArea} value={this.state.textarea}/>
                    </div>
                    <div className="row justify-content-lg-end w-75 pt-3">
                        <Button className="btn-md bg-primary" onClick={this.addTask}>Add
                            task</Button>
                    </div>

                    {(this.props.tasksList.length > 0) &&
                    <>
                        {this.props.tasksList.map((task) => (
                            <div className="row justify-content-lg-center w-100" key={task.id}>
                                <br/>
                                <Task metadata={task}/>
                            </div>
                        ))
                        }
                    </>
                    }
                </div>
                }
            </>
        )
    }
}


function mapStateToProps(state) {
    return {
        foundProfilesList: state.foundProfilesList,
        openContractsList: state.openContractsList,
        profile: state.selectedProfile,
        tasksList: state.tasksList,
        isTaskOpenPage: state.isTaskPageOpen
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
        ADD_TASKS_TO_LIST: ADD_TASKS_TO_LIST
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TaskView);