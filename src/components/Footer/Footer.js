import React from "react";
import classes from "./Footer.module.css";

const footer = (props) => (
  <section className={classes.FooterWrap}>
    <div className={classes.SocialMedias}>
      <ul>
        <li>
          <i className="fa fa-facebook"></i>
        </li>
        <li>
          <i className="fa fa-twitter"></i>
        </li>
        <li>
          <i className="fa fa-instagram"></i>
        </li>
        <li>
          <i className="fa fa-linkedin"></i>
        </li>
        <li>
          <i className="fa fa-youtube"></i>
        </li>
      </ul>
    </div>
    <div>
      &copy; Copyright By <span>INO</span> Discovery
    </div>
  </section>
);

export default footer;
