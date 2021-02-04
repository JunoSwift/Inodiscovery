import React from "react";
import classes from "./Deal.module.css";

const Deal = props => {
  return (
    <div className={classes.Deal}>
      <div className={classes.DealPhoto}>
        <img src={props.images} alt={props.carName} />
      </div>
      <div className={classes.DealContent}>
        <div>RF {props.price}</div>
        <div className={classes.DealContent}>
          <p>
            <strong>{props.carName}</strong>
          </p>
          <p>{props.carDetails.slice(0, 120)}</p>
          <button onClick={props.clicked}>More Details</button>
        </div>
      </div>
    </div>
  );
};

export default Deal;
