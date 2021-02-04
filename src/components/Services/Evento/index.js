import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Footer from "../../Footer/Footer";
import Event from "./EventCard/EventCard2";
import classes from "./index.module.css";
import bg from "../../../assets/Images/tourism/19525073863_5122b80463_c.jpg";
import event1 from "../../../assets/Images/events/x,cnmcnmcn.jpg";
import event2 from "../../../assets/Images/events/kriti-ranjan-event-poster-high.jpg";
import event3 from "../../../assets/Images/events/siduiiowi.jpg";
import event4 from "../../../assets/Images/events/eiuyteyuie.png";
import axios from "../../../hoc/Axios/Axios";
import Modal from "../../UI/Modal/Modal2";
import Spinner from "../../UI/Spinner/Spinner2";
class tourism extends Component {
  state = {
    events: [],
    eventInfo: null,
    isLoading: true,
    isEventClicked: false,
  };
  componentDidMount() {
    axios
      .get("/events.json")
      .then((res) => {
        let eventObj = null;
        const events = [];
        for (let key in res.data) {
          eventObj = { ...res.data[key], id: key };
          events.push(eventObj);
        }
        this.setState({ events: events });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
    this.eventView = (id) => {
      if (id) {
        if (
          !this.state.eventInfo ||
          (this.state.eventInfo && this.state.eventInfo.id !== id)
        ) {
          axios
            .get("/events/" + id + ".json")
            .then((res) => {
              if (res) {
                this.setState({ eventInfo: res.data });
                this.setState({ isLoading: false });
              }
            })
            .catch((error) => {
              console.log(error);
              this.setState({ isLoading: false });
            });
        }
      }
    };
  }
  closeModal = () => {
    this.setState({ isEventClicked: false });
  };
  goToEvent = (id) => {
    this.eventView(id);
    this.setState({ isEventClicked: true });
  };
  render() {
    const style = {
      height: "400px",
      bckgroundColor: "black",
      backgroundImage: `url(${bg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backGroundPosition: "center",
      zIndex: -1,
    };
    let modal = null;
    if (this.state.eventInfo) {
      {
        modal = (
          <Modal show={this.state.isEventClicked}>
            <div className={classes.Close} onClick={() => this.closeModal()}>
              Close <i className="fa fa-close"></i>
            </div>
            <div className={classes.EventModalContent}>
              <div className={classes.PosterHolder}>
                <img src={this.state.eventInfo.image} />
              </div>
              <div className={classes.PosterInfo}>
                <h2>{this.state.eventInfo.companyName}</h2>
                <h3>INFORMATIONS</h3>
                <p>{this.state.eventInfo.details}</p>
                <p>
                  <b>Apply ......</b>
                  <a href={this.state.eventInfo.link}>
                    {this.state.eventInfo.link}
                  </a>
                </p>
                <h3>LOCATION</h3>
                <p>KIgali Convention center,kigali-Gasabo ,street Kg 12</p>
              </div>
            </div>
          </Modal>
        );
      }
    }
    let events = null;
    if (this.state.isLoading) {
      events = <Spinner />;
    } else {
      if (this.state.events) {
        events = this.state.events.map((event, index) => {
          return (
            <Event
              key={index}
              image={event.image}
              clicked={() => this.goToEvent(event.id)}
            />
          );
        });
      } else {
        events = "No network";
      }
    }

    return (
      <Aux>
        {modal}
        <div className={classes.Events}>
          <div style={style}>
            <div className={classes.Bg}></div>
          </div>
          <div className={classes.TopEvents}>
            <h1> Events </h1>
            <p>
              Here you are ,Thank you for choosing Ino Discovery. You can choose
              Event you can attend
            </p>
          </div>
          <div className={classes.EventsHolder}>
            {events}
            <Event image={event1} />
            <Event image={event2} />
            <Event image={event3} />
            <Event image={event2} />
            <Event image={event4} />
            <Event image={event2} />
            <Event image={event1} />
            <Event image={event4} />
          </div>
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default tourism;
