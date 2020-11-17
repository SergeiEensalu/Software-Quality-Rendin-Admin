import React, {Component} from "react";
import {findCollection} from "../../../utils/Functions";
import Table from "react-bootstrap/Table";

class CoTenant extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        let list = [];
        if (this.props.metadata.coTenantProfiles !== undefined) {
            for (let coTenant = 0; coTenant < this.props.metadata.coTenantProfiles.length; coTenant++) {
                let profile = await findCollection('profiles', 'id', "==", this.props.metadata.coTenantProfiles[coTenant].id);
                await Promise.resolve(profile).then(promise => {
                    if (promise[0] !== undefined)
                        list.push(promise[0]);
                });
            }
        }

        this.setState({
            coTenantList: list
        });
    }

    render() {
        return (
            <div>
                {(this.state.coTenantList !== undefined) &&
                <div>
                    {(this.state.coTenantList.length > 0) &&
                    <div className="card mt-3">
                        <div className="card-body">
                            <h4>Co Tenants</h4>
                            <Table striped bordered hover responsive variant="light" className="w-100">
                                <thead className="bg-info text-white">
                                <tr>
                                    <th>Full name</th>
                                    <th>Personal code</th>
                                    <th>Contact</th>
                                    <th>Profile code</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.coTenantList.map(coTenant => (
                                    <tr key={coTenant.id}>
                                        <td>{coTenant.firstName} {coTenant.lastName}
                                        </td>
                                        <td>{coTenant.personalIdCode}</td>
                                        <td>{coTenant.phoneNumber}</td>
                                        <td>{coTenant.userProfileId}</td>
                                    </tr>
                                ))
                                }
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    }

                </div>
                }
            </div>
        )
    }
}

export default CoTenant