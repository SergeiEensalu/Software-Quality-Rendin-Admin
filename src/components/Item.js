import React from "react";
import Payment from "./Payment";
import Settings from "./Settings";

const Item = ({searchTerm}) => {
    return (
        <div>
            {(searchTerm === "payment") ? <Payment/> : <Settings/>}
        </div>
    );
};

export default Item;
