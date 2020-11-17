import React, {Component} from "react";
import {
    addHistory,
    findCollection,
    getFormattedDate,
    getFormattedDateTime,
    updateDataInCollection
} from "../../../utils/Functions";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";


class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contract: props.metadata,
            isHistoryCollapsOpen: true,
            checkboxChecked: false,
            textarea: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.setCollapsOpen = this.setCollapsOpen.bind(this);
        this.savaAdditionalInfo = this.savaAdditionalInfo.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.getAllHistoryAndTasks = this.getAllHistoryAndTasks.bind(this);
        this.refreshState = this.refreshState.bind(this);
        this.closeTask = this.closeTask.bind(this);
    }

    async componentDidMount() {
        let history = await findCollection("auditlog", "entityId","==", this.state.contract.id);
        let tasks = await findCollection("tasks", "entityId", "==", this.state.contract.id);

        if (tasks) {
            let openedTasks = tasks.filter(task => task.type === "agreement" && task.closed === null);
            let closedTasks = tasks.filter(task => task.type === "agreement" && task.closed !== null);
            for (let i = 0; i < closedTasks.length; i++) {
                history.push(closedTasks[i])
            }

            history = history.filter(history => history.type === "agreement");

            history.sort((a, b) => b.created.toDate() - a.created.toDate());

            openedTasks.sort(function (a, b) {
                if (a.closed === null && b.closed !== null) {
                    return -1
                } else if (b.closed === null && a.closed !== null) {
                    return 1
                } else {
                    return 0
                }
            });

            this.setState({
                history: history,
                tasks: openedTasks,
            });
        }
    }

    handleChange(evt) {
        this.setState({checkboxChecked: evt.target.checked});
    }

    async getAllHistoryAndTasks() {
        let history = await findCollection("auditlog", "entityId", "==", this.state.contract.id);
        let tasks = await findCollection("tasks", "entityId", "==", this.state.contract.id);

        if (tasks) {
            let openedTasks = tasks.filter(task => task.type === "agreement" && task.closed === null);
            let closedTasks = tasks.filter(task => task.type === "agreement" && task.closed !== null);
            for (let i = 0; i < closedTasks.length; i++) {
                history.push(closedTasks[i])
            }

            history = history.filter(history => history.type === "agreement");

            history.sort((a, b) => b.created.toDate() - a.created.toDate());

            openedTasks.sort(function (a, b) {
                if (a.closed === null && b.closed !== null) {
                    return -1
                } else if (b.closed === null && a.closed !== null) {
                    return 1
                } else {
                    return 0
                }
            });

            this.setState({
                history: history,
                tasks: openedTasks,
            });
        }
    }

    handleChangeTextArea(evt) {
        this.setState({textarea: evt.target.value});
    }

    handleToggle() {
        this.setState({checkboxChecked: !this.state.checkboxChecked});
    }

    setCollapsOpen() {
        this.setState({
            isHistoryCollapsOpen: !this.state.isHistoryCollapsOpen,
        });
    }

    refreshState() {
        this.setState({
            checkboxChecked: false,
            textarea: ''
        });
    }

    async savaAdditionalInfo() {
        if (this.state.textarea.length < 1) {
            console.log("textarea cant be wit size:", this.state.textarea.length);
            return;
        }
        if (this.state.checkboxChecked) {
            await addHistory("tasks", null, this.state.textarea, this.state.contract.id, "agreement", JSON.parse(localStorage.getItem("authUser")).uid);
            this.getAllHistoryAndTasks();
            this.refreshState();
            return;
        }
        await addHistory("auditlog", null, this.state.textarea, this.state.contract.id, "agreement", JSON.parse(localStorage.getItem("authUser")).uid);
        this.getAllHistoryAndTasks();
        this.refreshState();
    }

    style = {
        width: 400
    };

    drowTasksTable(data) {
        return (
            <>
                {data.length > 0 &&
                <div className="list-group">
                    <div className="w-100 bg-info text-white list-group-item">
                        <h4>Tasks</h4>
                    </div>
                    {data.map((his) => (
                        <div key={his.id} className="mt-3">
                            <div className="w-auto list-group-item border-dark">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="mb-1 tab w-75">
                                        Opened: <h5>{getFormattedDateTime(his.created)} {getFormattedDate(his.created)}</h5>
                                        {(his.closed !== null) ?
                                            <>Closed: <h5> {getFormattedDateTime(his.closed)} {getFormattedDate(his.closed)} </h5></>
                                            : <>Status: <h5 className="text-danger"> Open </h5>
                                            </>}
                                        Description: <h5 className="px-md-5">{his.description}</h5>
                                    </div>
                                    <div>
                                        Owner: <h5>{his.email}</h5>
                                        <button type="button" className="btn btn-primary btn-block btn-md"
                                                onClick={() => this.closeTask(his)}>Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                }
            </>
        )
    }

    async closeTask(task) {
        let index = this.state.tasks.indexOf(task);

        let changedData = this.state.tasks[index];
        changedData.closed = new Date(Date.now());
        changedData.status = 'closed';

        await updateDataInCollection("tasks", changedData.id, changedData);
        await this.getAllHistoryAndTasks();

    }

    drowHistoryTable(data) {
        return (
            <>
                {data.length > 0 &&
                <div className="list-group">
                    <div className="w-100 bg-info text-white list-group-item">
                        <h4>Information</h4>
                    </div>
                    {data.map((his, index) => (
                        <div key={index} className="mt-3">
                            <div key={index} className="w-auto list-group-item border-dark">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="mb-1 tab w-75">
                                        Registered: <h5>{getFormattedDateTime(his.created)} {getFormattedDate(his.created)}</h5>
                                        {his.closed &&
                                        <>
                                            Closed: <h5> {getFormattedDateTime(his.closed)} {getFormattedDate(his.closed)} </h5>
                                            Task status: <h5 className="text-success"> Closed </h5>
                                        </>
                                        }
                                        Description: <h5 className="px-md-5">{his.description}</h5>
                                    </div>
                                    <div>
                                        Owner: <h5>{his.email}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div>
                }
            </>
        )
    }


    render() {
        return (
            <div>
                <br/>
                <div className="card">
                    <Collapse in={this.state.isHistoryCollapsOpen}>
                        <div className="card-body">
                            <div className="form-group">
                                <h4 htmlFor="textarea">Add information</h4>
                                <textarea className="form-control" name="textarea" id="textarea" rows="3"
                                          onChange={this.handleChangeTextArea} value={this.state.textarea}/>
                            </div>
                            <div className="form-group">
                                <Checkbox
                                    checked={this.state.checkboxChecked}
                                    onChange={this.handleChange}/>
                                <Button type="button"
                                        onClick={this.handleToggle}>Task</Button>
                                <Button className="btn-lg bg-primary text-white border-dark wx-auto"
                                        onClick={this.savaAdditionalInfo} disabled={this.state.textarea.length < 1}>Add
                                    info</Button>
                            </div>

                            {this.state.tasks &&
                            <div>
                                {this.drowTasksTable(this.state.tasks)}
                            </div>}

                            {this.state.history &&
                            <div>
                                <br/>
                                {this.drowHistoryTable(this.state.history)}
                            </div>
                            }
                        </div>
                    </Collapse>
                </div>
            </div>
        )
    }
}

export default History

