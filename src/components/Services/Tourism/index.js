import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import axios from "../../../hoc/Axios/Axios";
import Spinner from "../../UI/Spinner/Spinner2";
import Footer from "../../Footer/Footer";
import TravelCard from "./TravelCard/TravelCard";
import classes from "./index.module.css";
import bg from "../../../assets/Images/tourism/19525073863_5122b80463_c.jpg";
import place1 from "../../../assets/Images/tourism/popopop.jpg";
import place2 from "../../../assets/Images/tourism/-1x-1.jpg";

class tourism extends Component {
  state = {
    travels: [],
    isLoading: true,
  };
  componentDidMount() {
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
  }
  goToTrip = (id) => {
    this.props.history.push("/trip-view/" + id);
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
    let tripDisplay = null;
    if (this.state.isLoading) {
      tripDisplay = <Spinner />;
    } else {
      if (this.state.travels) {
        console.log(this.state.travels);
        let image = null;
        tripDisplay = this.state.travels.map((trip, index) => {
          for (const key in trip.images) {
            image = trip.images[key].src;
          }
          return (
            <TravelCard
              key={trip.index}
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
        <div className={classes.Tourism}>
          <div style={style}>
            <div className={classes.Bg}></div>
          </div>
          <div className={classes.TopTourism}>
            <h1> Tourism / Traveling </h1>
            <p>
              Here you are ,Thank you for choosing Ino Discovery. You can choose
              the best Location to travel
            </p>
          </div>
          <div className={classes.TourismHolder}>
            {tripDisplay}
            <TravelCard image={place1} />
            <TravelCard image={place2} />
            <TravelCard image={place1} />
            <TravelCard image={place2} />
            <TravelCard image={place1} />
          </div>
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default tourism;
