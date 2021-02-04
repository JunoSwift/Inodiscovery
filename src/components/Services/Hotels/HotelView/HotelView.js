import React, { Component } from "react";
import axios from "../../../../hoc/Axios/Axios";
import classes from "./HotelView.module.css";
import mapImage from "../../../../assets/Images/map.JPG";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Hotel from "../HotelCard/HotelCard2";
import Footer from "../../../Footer/Footer";
import Spinner from "../../../UI/Spinner/Spinner";
import Spinner2 from "../../../UI/Spinner/Spinner2";
import { withRouter } from "react-router-dom";
import Garelly from "react-grid-gallery";
import Carousel from "re-carousel";

class HotelView extends Component {
  state = {
    hotels: null,
    hotelData: null,
    isLoading: true,
    isHovered: false,
    hoveredService: null,
  };
  recommendedHotels = () => {
    axios
      .get("/Hotels.json")
      .then((res) => {
        const datas = [];
        for (const key in res.data) {
          datas.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ hotels: datas });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  };
  toggleHover = (image, caption, cost) => {
    //this.setState((prevState) => ({ isHovered: !prevState.isHovered }));
    const hoveredData = { image: image, caption: caption, serviceCost: cost };

    this.setState({
      isHovered: true,
      hoveredService: hoveredData,
    });
  };

  viewHoteldetails = (paramId) => {
    if (paramId) {
      if (
        !this.state.hotelData ||
        (this.state.hotelData && this.state.hotelData.id !== paramId)
      ) {
        axios
          .get("/Hotels/" + paramId + ".json")
          .then((res) => {
            this.setState({ hotelData: res.data });
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
  clickedHotelHandler = (id) => {
    this.props.history.push("/hotel-view/" + id);
    this.viewHoteldetails(id);
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.recommendedHotels();
    this.viewHoteldetails(id);
  }
  goToreservation = () => {
    this.props.history.push("/reservation");
  };
  render() {
    /**........Hotel view Code.......... */
    let hotelView = (
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
    if (this.props.match.params.id) {
      hotelView = <Spinner />;
    }
    if (this.state.hotelData) {
      const images = [];
      const descriptionsData = [];
      const servicesCosts = [];

      for (const key in this.state.hotelData.descriptions) {
        descriptionsData.push(this.state.hotelData.descriptions[key]);
      }
      for (const key in this.state.hotelData.servicesCost) {
        servicesCosts.push({
          ...this.state.hotelData.servicesCost[key],
        });
      }

      const descriptions = descriptionsData.map((description, index) => (
        <Aux key={index + 1}>
          <h3>{description.title}</h3>
          <p> {description.about}</p>
        </Aux>
      ));

      for (const key in this.state.hotelData.images) {
        images.push(this.state.hotelData.images[key]);
      }

      const imageList = servicesCosts.map((service, index) => (
        <Aux key={index}>
          <div
            className={classes.Costs}
            onMouseEnter={this.toggleHover.bind(
              this,
              service.image,
              service.serviceName,
              service.serviceCost
            )}
            onClick={this.toggleHover.bind(
              this,
              service.image,
              service.serviceName,
              service.serviceCost
            )}
          >
            <img src={service.image} />
            <div className={classes.ServiceName}>{service.serviceName}</div>
            <div className={classes.ServiceCost}>{service.serviceCost}</div>
          </div>
        </Aux>
      ));
      //*********   ___________________************ */
      let serviceSlider = (
        <Carousel loop auto>
          {servicesCosts.map((service, index) => (
            <div key={index}>
              <img src={service.image} />
              <p>
                {service.serviceName} _____ {service.serviceCost}
              </p>
            </div>
          ))}
        </Carousel>
      );
      //where service clicked or hovered will be shown
      if (this.state.isHovered) {
        serviceSlider = (
          <Aux>
            <img src={this.state.hoveredService.image} />
            <p className={classes.MyP}>
              {this.state.hoveredService.caption} _____
              {this.state.hoveredService.serviceCost}
            </p>
          </Aux>
        );
      }
      const galleryDisplay = <Garelly images={images} />;

      hotelView = (
        <Aux>
          <div className={classes.BgHeader}></div>
          <h1 className={classes.hotelTtitle}>
            {this.state.hotelData.hotelName}
          </h1>
          <div className={classes.HotelShow}>
            <div className={classes.HotelViews}>
              <div className={classes.HotelSlider}>{serviceSlider}</div>
              <div className={classes.HotelPhotosLine}>{imageList}</div>
              <div className={classes.HotelPresent}>
                <div className={classes.SpecialOffers}>
                  <h3>Special Offers</h3>
                  <div className={classes.Offers}>
                    <div>
                      Breakfast
                      <i className="fa fa-coffee fa-2x"></i>
                      158,000Frw
                    </div>
                    <div>
                      Bedroom
                      <i className="fa fa-bed fa-2x"></i>
                      158,000Frw
                    </div>
                    <div>
                      Breakfast <i className="fa fa-bed fa-2x"></i> 158,000Frw
                    </div>
                  </div>
                </div>
                <div className={classes.MapShow}>
                  <img
                    src={mapImage}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "100%",
                    }}
                  />
                </div>
                <div
                  className={classes.BookButton}
                  onClick={this.goToreservation}
                >
                  Book Now
                  <i className="fa fa-long-arrow-right fa-2x"></i>
                </div>
              </div>
            </div>
            <div className={classes.HotelPhotosLine}>{imageList}</div>
            
            <h2 className={classes.GarellyTitle}>Hotel Garelly</h2>
            <div className={classes.HotelDetails}>{galleryDisplay}</div>
            <h2 className={classes.GarellyTitle}>Description</h2>
            <div className={classes.Description}>
              <div className={classes.DescriptionRow}>{descriptions}</div>
            </div>
            <div className={classes.HotelPresent}>
              <div className={classes.MapShowMini}>
                <img
                  src={mapImage}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    height: "100%",
                  }}
                />
              </div>
              <div
                className={classes.BookButtonMini}
                onClick={this.goToreservation}
              >
                Book Now
                <i className="fa fa-long-arrow-right fa-2x"></i>
              </div>
            </div>
          </div>
        </Aux>
      );
    }
    /**........______________.......... */
    /**this is hotels recommended list */
    let hotelsList = <Spinner2 />;
    if (this.state.hotels) {
      for (const htl of this.state.hotels) {
        hotelsList = this.state.hotels.map((htl) => (
          <Hotel
            key={htl.id}
            image={htl.images.image1.src}
            name={htl.hotelName}
            location={htl.address.location}
            clicked={() => this.clickedHotelHandler(htl.id)}
          />
        ));
      }
    }

    /**-------------------------- */
    return (
      <Aux>
        {hotelView}
        <h2 className={classes.RecommendationTitle}>RECOMMENDED DESTINATION</h2>
        <div className={classes.Hotels}>{hotelsList}</div>
        <Footer />
      </Aux>
    );
  }
}

export default withRouter(HotelView);
