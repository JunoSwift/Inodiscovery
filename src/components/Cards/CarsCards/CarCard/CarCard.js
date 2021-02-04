import React from "react";
import classes from "./CarCard.module.css";
const carCard = (props) => {
  const styles = {
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backGroundPosition: "center",
  };
  return (
    <div className={classes.CarCard} onClick={props.clicked}>
      <div className={classes.CardImageHolder} style={styles}></div>
      <div className={classes.CardContent}>
        <h3>{props.carName}</h3>

        <div className={classes.Mission}>
          Type: {props.carType}
          <div className={classes.Location}>
            <i className="fa fa-map-marker fa-1x"></i> Location...
          </div>
        </div>
      </div>
      <div className={classes.Recommend}>For Sell</div>
      <div className={classes.CostHold}> {props.price} RWF</div>
    </div>
  );
};

export default carCard;
