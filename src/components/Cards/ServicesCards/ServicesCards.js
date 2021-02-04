import React from "react";
import ServiceCard from "./ServiceCard/ServiceCard";
import classes from "./ServicesCards.module.css";

const servicesCards = (props) => (
  
  <div className={classes.ServicesCards}>
    <ServiceCard
      background="#27476E"
      icon="fa fa-area-chart fa-3x"
      link="/hotels"
      hotels={props.hotels}
    >
      Hotels
    </ServiceCard>

    <ServiceCard
      background="#DF7400"
      icon="fa fa-hotel fa-3x"
      link="/appartements"
    >
      Appartements
    </ServiceCard>
    <ServiceCard background="#DF003D" icon="fa fa-car fa-3x" link="/cars">
      Cars
    </ServiceCard>
    <ServiceCard background="#094A02" icon="fa fa-car fa-3x" link="/travelling">
      Travel
    </ServiceCard>
    <ServiceCard background="#12024A" icon="fa fa-car fa-3x" link="/events">
      Events
    </ServiceCard>
  </div>
);
export default servicesCards;
