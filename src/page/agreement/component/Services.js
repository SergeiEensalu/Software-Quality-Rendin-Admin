import React, {useState} from "react";
import Collapse from "react-bootstrap/Collapse";

function Services(props) {
    const [isOpen, setOpen] = useState(props.open);

    return (
        <div>
            <br/>
            <div className="card">
                <div className="bg-primary text-white card-header"
                     onClick={() => setOpen(!isOpen)}
                     aria-controls="example-collapse-text"
                     aria-expanded={isOpen}>
                    <h4 className="title">Utilities and Services</h4>
                </div>
                <Collapse in={isOpen}>
                    <div className="table-dark card-body" id="example-collapse-text">
                        <form>
                            <div className="row">
                                <div className="col"><h6>Parameter</h6></div>
                                <div className="col text-center"><h6>Contract owner</h6></div>
                                <div className="col text-center"><h6>Payment recipient</h6></div>
                                <div className="col text-center"><h6>Who is paying</h6></div>
                            </div>
                            <br/>
                            <br/>


                        </form>
                    </div>
                </Collapse>
            </div>
        </div>

    )

}

export default Services