import React, { Component } from "react";
import classes from "./FrontProfile.module.css";
import photo from "../../../../../assets/Images/Header Profile 2.png";
class FrontProfile extends Component {
  render() {
    return (
      <div className={classes.ProfileContainer}>
        <div>
          <img className={classes.ProfileImage} src={photo} alt="" />
        </div>
      </div>
    );
  }
}

export default FrontProfile;
