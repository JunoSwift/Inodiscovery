import classes from "./SelectedType.module.css";
import React from "react";

const SelectedType = (props) => {
  
  return (
    <div className={classes.SelectedType}>
      <div className={classes.imageContainer}>
        <img src={props.carPhoto} alt={props.name} />
      </div>
      <div className={classes.Car_card_Details}>
        <div className={classes.CarTitle_}>{props.carName} {props.carType}</div>
        <p className={classes.SelectedCarDescription}>
          {props.carDetails.slice(0,150)}
        </p>
        <button onClick={props.clicked} className={classes.BuyCar} >Deal</button>
        <p className={classes.CarPrice}>Price: RF {props.price}</p>
      </div>
    </div>
  );
};

export default SelectedType;
