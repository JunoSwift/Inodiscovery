import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import axios from "../../../hoc/Axios/Axios";
import Footer from "../../Footer/Footer";
import Hotel from "./HotelCard/HotelCard2";
import classes from "./index.module.css";
import hotel1 from "../../../assets/Images/hotels/wreqrerer.jpg";
import hotel2 from "../../../assets/Images/hotels/yueyeuyeie.jpg";
import Spinner from "../../UI/Spinner/Spinner2";
class Hotels extends Component {
  state = {
    hotels: null,
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get("/Hotels.json")
      .then((res) => {
        let hotelsObj = null;
        const hotel = [];
        for (let key in res.data) {
          hotelsObj = { ...res.data[key], id: key };
          hotel.push(hotelsObj);
        }
        this.setState({ hotels: hotel });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }
  clickedHotelHandler = (id) => {
    this.props.history.push("/hotel-view/" + id);
  };
  render() {
    const style = {
      height: "400px",
      bckgroundColor: "black",
      backgroundImage: `url("https://www.hotelvillacimbrone.com/wp-content/uploads/2020/02/Hotel-Villa-Cimbrone-7-1800.jpg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backGroundPosition: "center",
      zIndex: -1,
    };
    let hotels = null;
    if (this.state.isLoading) {
      hotels = <Spinner />;
    } else {
      if (this.state.hotels) {
        hotels = this.state.hotels.map((hotel) => {
          return (
            <Hotel
              key={hotel.hotelName}
              image={hotel.images.image1.src}
              name={hotel.hotelName}
              location={hotel.address.location}
              clicked={() => this.clickedHotelHandler(hotel.id)}
            />
          );
        });
      } else {
        hotels = "No network";
      }
    }
    return (
      <Aux>
        <div className={classes.Hotels}>
          <div style={style}>
            <div className={classes.Bg}></div>
          </div>
          <div className={classes.TopHotels}>
            <h1> Hotels </h1>
            <p>
              Here you are ,Thank you for choosing Ino Discovery. You can choose
              the best Affordable Hotel and be the first of booking
            </p>
          </div>
          <div className={classes.HotelsHolder}>
            {hotels}
            <Hotel image={hotel1} link="/hotel-view" />
            <Hotel image={hotel2} link="/hotel-view" />
            <Hotel image={hotel1} link="/hotel-view" />
            <Hotel image={hotel2} link="/hotel-view" />
            <Hotel image={hotel1} link="/hotel-view" />
          </div>
        </div>
        <Footer />
      </Aux>
    );
  }
}

export default Hotels;
