import React from "react";
import classes from "./HotelCard.module.css";
const hotelCard = (props) => {
  const styles = {
    backgroundImage: `url(${props.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backGroundPosition: "center",
  };
  return (
    <div className={classes.HotelCard} onClick={props.clicked}>
      <div className={classes.HotelImageHolder} style={styles}></div>
      <div className={classes.CardContent}>
        <h3>{props.name}</h3>
        <i className="fa fa-star fa-1x"></i>
        <i className="fa fa-star fa-1x"></i>
        <i className="fa fa-star fa-1x"></i>
        <i className="fa fa-star fa-1x"></i>
        <i className="fa fa-star fa-1x"></i>
        <div className={classes.Mission}>
          From __{props.minCost} RWf
          <div className={classes.Location}>
            <i className="fa fa-map-marker fa-1x"></i> {props.location}
          </div>
        </div>
      </div>
      <div className={classes.Recommend}>Recommended</div>
    </div>
  );
};

export default hotelCard;
