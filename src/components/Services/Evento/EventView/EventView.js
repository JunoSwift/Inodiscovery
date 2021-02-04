import React, { Component } from "react";
import classes from "./EventView.module.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Event from "../../../Services/Evento/EventCard/EventCard2";
import Spinner from "../../../UI/Spinner/Spinner2";
import axios from "../../../../hoc/Axios/Axios";
import { withRouter } from "react-router-dom";

class eventView extends Component {
  state = {
    eventData: null,
    events: null,
    isLoading: true,
  };
  recommendedEvents = () => {
    axios
      .get("/events.json")
      .then((res) => {
        const datas = [];
        for (const key in res.data) {
          datas.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ events: datas });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  eventDetails = (paramaId) => {
    if (paramaId) {
      if (
        !this.state.eventData ||
        (this.state.eventData && this.state.eventData.id !== paramaId)
      ) {
        axios
          .get("/events/" + paramaId + ".json")
          .then((res) => {
            this.setState({ eventData: res.data });
            if (res) {
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
  clickedEventHandler = (id) => {
    this.props.history.push("/event/" + id);
    this.eventDetails(id);
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.eventDetails(id);
    this.recommendedEvents();
  }
  render() {
    let eventView = (
      <p
        style={{
          margin: "auto",
          width: "100%",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        No Data found!
      </p>
    );
    let events = [];
    if (this.state.events) {
      const evt = this.state.events;
      for (const key in evt) {
        events.push(
          <Event
            key={key}
            image={evt[key].image}
            eventName={evt[key].eventName}
            date={evt[key].time}
            clicked={() => this.clickedEventHandler(evt[key].id)}
          />
        );
      }
    }

    if (this.props.match.params.id) {
      eventView = <Spinner />;
    }
    if (this.state.eventData) {
      console.log("event......", this.state.eventData);
      eventView = (
        <Aux>
          <div className={classes.ImageHold}>
            <img
              src={this.state.eventData.image}
              alt={this.state.eventData.eventName}
            />
          </div>
          <div className={classes.InfoHold}>
            <h3>{this.state.eventData.eventName}</h3>
            <p>
              <b>BY ...</b>
              {this.state.eventData.companyName}
            </p>
            <div className={classes.Location}>
              Location___
              <p>{this.state.eventData.location}</p>
            </div>
            <div className={classes.Date}>
              Date,Time___
              <p>{this.state.eventData.time}</p>
            </div>
          </div>
          <div className={classes.AboutSection}>
            <div className={classes.Left}>
              <h3>About this Event</h3>
              <p>{this.state.eventData.details}</p>
              <p className={classes.Apply}>
                Apply Here...
                <br />
                <a href={this.state.eventData.link}>
                  {this.state.eventData.link}
                </a>
              </p>
            </div>
            <h2>Other Events You May Like</h2>
            <div className={classes.EventsRecommend}>{events}</div>
          </div>
        </Aux>
      );
    }

    return (
      <div className={classes.EventViewWrap}>
        <div className={classes.Bg}></div>
        <div className={classes.EventInfoSection}>{eventView}</div>
      </div>
    );
  }
}

export default withRouter(eventView);
