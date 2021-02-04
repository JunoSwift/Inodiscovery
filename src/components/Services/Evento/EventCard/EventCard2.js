import React from "react";
import classes from "./EventCard2.module.css";
const event = (props) => {
  return (
    <div className={classes.Card} onClick={props.clicked}>
      <div className={classes.CardImageHolder}>
        <img src={props.image} />
      </div>
      <div className={classes.EventName}>
        {props.eventName},___{props.date}
      </div>
      {/* <div className={classes.Date}>{props.date}</div> */}
    </div>
  );
};

export default event;
