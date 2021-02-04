import React from "react";
import classes from "./HotelCard2.module.css";


const CardTwo = (props) => {
  return (
    <div className={classes.HotelCard} onClick={props.clicked}>
      <div className={classes.CardImageHolder}>
        <img src={props.image} alt={props.hotelName} />
      </div>
      <div className={classes.CardContent}>
        <h3>{props.name}</h3>

        <div className={classes.Location}>
          {props.location}
          <p className={classes.Stricked}>
            <s>200,000 Rwf</s>
          </p>
          <p className={classes.ReadMore}>Read More</p>
        </div>
      </div>
      <div className={classes.Cost}>150,000 Frw</div>
    </div>
  );
};

export default CardTwo;
