import React, {useState} from "react";
import Collapse from "react-bootstrap/Collapse";

function BackgroundCheck(props) {
    const [isOpen, setOpen] = useState(props.open);

    return (
        <div>
            <div className="card">
                {props.metadata ?
                    <div>
                        {props.metadata[props.metadata.length - 1].accepted ?
                            <div className="form-control-lg form-control label text-success"
                                 onClick={() => setOpen(!isOpen)}
                                 aria-expanded={isOpen}>
                                <div className="row">
                                    <div className="col text-center">
                                        <h5>Success</h5></div>
                                    <div className="col text-center">
                                        <h5>{props.metadata[props.metadata.length - 1].originalQueryDate && props.metadata[props.metadata.length - 1].originalQueryDate.toString()}</h5>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="form-control-lg form-control label text-danger"
                                 onClick={() => setOpen(!isOpen)}
                                 aria-expanded={isOpen}>
                                <div className="row">
                                    <div className="col text-center">
                                        <h5>Failed</h5></div>
                                    <div className="col text-center">
                                        <h5>{props.metadata[props.metadata.length - 1].originalQueryDate && props.metadata[props.metadata.length - 1].originalQueryDate.toString()}</h5>
                                    </div>
                                </div>
                            </div>
                        }
                    </div> :
                    <div className="form-control-lg form-control label"
                         onClick={() => setOpen(!isOpen)}
                         aria-expanded={isOpen}>
                        <div className="text-center">
                            <h6 className="text-danger">No background checks</h6>
                        </div>
                    </div>
                }

                <Collapse in={isOpen}>
                    <div className="card-body" id="example-collapse-text">
                        {props.metadata ?
                            <div>
                                <div className="row">
                                    <div className="col text-center"><h6>Accepted</h6></div>
                                    <div className="col text-center"><h6>Score</h6></div>
                                    <div className="col text-center"><h6>Time</h6></div>
                                </div>

                                {props.metadata.map((check, i) =>
                                    <div className="row" key={i}>
                                        <div className="col text-center"><h6>{check.accepted.toString()}</h6></div>
                                        <div className="col text-center"><h6>{check.resultScore}</h6></div>
                                        <div className="col text-center"><h6>{check.originalQueryDate}</h6></div>
                                    </div>
                                )}
                            </div> :
                            <div className="text-center">
                                <h6 className="text-danger">No background checks</h6>
                            </div>
                        }
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default BackgroundCheck

