import React from "react";
import classes from "./AppartementCard.module.css";

const Appartement = (props) => {
  return (
    <div className={classes.Card} onClick={props.clicked}>
      <div className={classes.CardImageHolder}>
        <img src={props.image} />
      </div>
      <div className={classes.Cost}>
        {props.miniCost} <span>/Month</span>
      </div>
      <div className={classes.CardContent}>
        <h3>{props.appartName}</h3>
        <div className={classes.Location}>Location... {props.location}</div>
        <div>
          2 <i className="fa fa-bed"></i> 3
          <i className="fa fa-reddit-alien"></i>
        </div>
      </div>
    </div>
  );
};

export default Appartement;
