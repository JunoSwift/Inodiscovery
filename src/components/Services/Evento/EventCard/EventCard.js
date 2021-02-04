import React from "react";
import classes from "./EventCard.module.css";
const eventCard = (props) => {
  return (
    <div className={classes.EventWrap}>
      <div className={classes.EventImageHolder}>
        <img src={props.image} />
      </div>
      <div className={classes.CardContent}>
        <ul>
          {/* <li>
            <span>WHERE:</span> Kimironko
          </li> */}
          <li>
            <span>Event:</span> KIGALI FILM FESTIVAL on 22/22/2020 KIGALI FILM
            FESTIVAL on 22/22/2020
          </li>
          {/* <li>
            <span>WHEN:</span> 12/12/2020 at 12:00"
          </li>
          <li>
            <span>POSTED BY:</span>INO Discovery
          </li> */}
        </ul>
        <button>{">>>"}</button>
      </div>
      <div className={classes.Go}>GO</div>
    </div>
  );
};

export default eventCard;
