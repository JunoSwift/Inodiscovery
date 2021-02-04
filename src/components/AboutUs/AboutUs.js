import React from "react";
import classes from "./Aboutus.module.css";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Footer from "../Footer/Footer";
const about = (props) => {
  const style = {
    backgroundColor: "var(--clr-green1)",
    height: "300px",
  };
  return (
    <Aux>
      <div className={classes.AboutUs}>
        <div style={style}></div>
        <div className={classes.TopAbout}>
          <h1>ABOUT Ino Discovery </h1>
          <p>
            Want to get in touch? we'd love to hear from you,here's how you can
            reach us
          </p>
          <img src="https://www.hill-abbott.co.uk/wp-content/uploads/2019/02/Grey-contact-background.png" />
        </div>
        <div className={classes.VisionList}>
          <ul>
            <li>
              <i className="fa fa-phone fa-3x"></i>
              <h2>Mission</h2>
              <p>
                INO Discovery helps clients to book a travel, hotel Rooms, Car
                and House Rentals, from various companies and individuals In
                Rwanda through our online Platform. We thrive on repeat business
                by developing relationships with our clients and calling them
                timely reminders for booked Services.{" "}
              </p>
            </li>
            <li>
              <i className="fa fa-phone fa-3x"></i>
              <h2>Vision</h2>
              <p>
                INO Discovery will provide our customers to find information of
                services within Rwanda and outside of the country on both side
                of private and public sector.{" "}
              </p>
            </li>
            <li>
              <i className="fa fa-phone fa-3x"></i>
              <h2>Objective</h2>
              <p>
                We are in this Business to meet the customer’s needs to their
                expectations; we want to keep it simpl
              </p>
            </li>
          </ul>
          <div className={classes.MessagingContact}>
            <h1>Testimonials</h1>
          </div>
        </div>
      </div>
      <Footer />
    </Aux>
  );
};
export default about;
