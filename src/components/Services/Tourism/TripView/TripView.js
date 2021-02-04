import React, { Component } from "react";
import classes from "./TripView.module.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Spinner from "../../../UI/Spinner/Spinner2";
import Trip from "../TravelCard/TravelCard";
import Footer from "../../../Footer/Footer";
import axios from "../../../../hoc/Axios/Axios";
import Garelly from "react-grid-gallery";
import { withRouter } from "react-router-dom";
class TripView extends Component {
  state = {
    travels: [],
    tripData: null,
    isLoading: true,
  };

  tripPresent = (paramsId) => {
    if (paramsId) {
      if (
        !this.state.tripData ||
        (this.state.tripData && this.state.tripData.id !== paramsId)
      ) {
        axios
          .get("/Travelling/" + paramsId + ".json")
          .then((res) => {
            if (res) {
              this.setState({ tripData: res.data });
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
  recommendation = () => {
    axios
      .get("/Travelling.json")
      .then((res) => {
        let travelObj = null;
        const travels = [];
        for (let key in res.data) {
          travelObj = { ...res.data[key], id: key };
          travels.push(travelObj);
        }
        this.setState({ travels: travels });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.tripPresent(id);
    this.recommendation();
  }
  goToTrip = (id) => {
    this.props.history.push("/trip-view/" + id);
    this.tripPresent(id);
  };
  render() {
    console.log(this.props);
    let tripDisplay = null;
    let tripData = null;
    let GarellyDisplay = null;
    const images = [];
    let img1 = null;
    if (this.state.isLoading) {
      tripDisplay = <Spinner />;
      tripData = <Spinner />;
    } else {
      if (this.state.tripData) {
        //_______Garelly Codes

        for (const key in this.state.tripData.images) {
          images.push({
            ...this.state.tripData.images[key],
            thumbnail: this.state.tripData.images[key].src,
            thumbnailWidth: "100px",
            thumbnailHeight: "100px",
          });
        }
        GarellyDisplay = <Garelly images={images} />;
        img1 = images[0].src;

        //_______End_______
        tripData = (
          <Aux>
            <h3>{this.state.tripData.travelName}</h3>
            ___Go With____
            <h5>{this.state.tripData.companyName}</h5>
            <h3>About Trip</h3>
            <p>{this.state.tripData.details}</p>
            <h3>Exact Location</h3>
            <p>
              {this.state.tripData.location}
              <h4>Trip Cost________{this.state.tripData.cost}</h4>
            </p>
          </Aux>
        );
      }
      if (this.state.travels) {
        let image = null;
        tripDisplay = this.state.travels.map((trip, index) => {
          for (const key in trip.images) {
            image = trip.images[key].src;
          }
          return (
            <Trip
              key={index}
              image={image}
              tripName={trip.travelName}
              location={trip.location}
              agency={trip.companyName}
              cost={trip.cost}
              clicked={() => this.goToTrip(trip.id)}
            />
          );
        });
      } else {
        tripDisplay = "No network";
      }
    }

    return (
      <Aux>
        <div className={classes.TripTopBg}></div>
        <div className={classes.TripView}>
          <div className={classes.TripSlider}>
            <img src={img1} />
          </div>
          <div className={classes.garellyLine}>{GarellyDisplay}</div>
          <div className={classes.TripDetails}>{tripData}</div>
        </div>
        <div className={classes.garellyLineDesktop}>{GarellyDisplay}</div>

        <div className={classes.Trips}>
          <h1 className={classes.H1}>MORE PLACE TO TRAVEL</h1>
          {tripDisplay}
        </div>
        <Footer />
      </Aux>
    );
  }
}

export default withRouter(TripView);
