import React, { Component } from "react";
import classes from "./CarDetails.module.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import VehicleOverview from "./VehicleOverview/VehicleOverview";
import { withRouter } from "react-router-dom";
import Spinner from "../../../../components/UI/Spinner/Spinner2";
import axios from "../../../../hoc/Axios/Axios";
import FrontProfile from "../CarDetails/FrontProfile/FrontProfile";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Modal from "../../../../components/UI/Modal/Modal2";
class CarDetails extends Component {
  state = {
    loadedCar: null,
    isModalOpen: false,
  };

  showContactHandler = () => {
    this.setState({ isModalOpen: true, backdrop: false });
  };
  closeModalHandler = () => {
    this.setState({ isModalOpen: false });
    console.log("Hello");
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedCar ||
        (this.state.loadedCar &&
          this.state.loadedCar.id !== +this.props.match.params.id)
      ) {
        axios
          .get("cars/id" + this.props.match.params.id + ".json")
          .then((response) => {
            console.log(response);
            this.setState({ loadedCar: response.data });
          });
      }
    }
  }
  render() {
    let postedCar = <p>Waiting...!</p>;
    if (this.props.match.params.id) {
      postedCar = <Spinner />;
    }
    if (this.state.loadedCar) {
      postedCar = (
        <Aux>
          <Modal
            show={this.state.isModalOpen}
            modalClosed={this.closeModalHandler}
          >
            <FrontProfile />
          </Modal>
          <div className={classes.carDetails}>
            <div className={classes.ImageContainer}>
              <img
                src={this.state.loadedCar.images}
                alt={this.state.loadedCar.images}
              />
              <div className={classes.FeatherBanner} />
            </div>
            <div className={classes.FullCar}>
              <div className={classes.TitlePhoto}>
                <img
                  src={this.state.loadedCar.images}
                  alt={this.state.loadedCar.images}
                />
              </div>
              <div className={classes.CarDescription}>
                <p className={classes.ContentTitle}>
                  {this.state.loadedCar.carName}
                </p>
                <p className={classes.CarSubTitle}>
                  {this.state.loadedCar.carType}
                </p>
                <p className={classes.CarContent}>
                  {this.state.loadedCar.carDetails}
                </p>
                <button onClick={this.showContactHandler}>Let's Deal</button>
              </div>
            </div>

            <div className={classes.CarAllSides}>
              <div className={classes.SidesPhoto}>
                <SideBySideMagnifier
                  imageSrc={this.state.loadedCar.otherImages.image1}
                  imageAlt={this.state.loadedCar.otherImages.carName}
                />
              </div>
              <div className={classes.SidesPhoto}>
                <SideBySideMagnifier
                  imageSrc={this.state.loadedCar.otherImages.image2}
                  imageAlt={this.state.loadedCar.otherImages.carName}
                />
              </div>
              <div className={classes.SidesPhoto}>
                <SideBySideMagnifier
                  imageSrc={this.state.loadedCar.otherImages.image3}
                  imageAlt={this.state.loadedCar.otherImages.carName}
                />
              </div>
              <div className={classes.SidesPhoto}>
                <SideBySideMagnifier
                  imageSrc={this.state.loadedCar.otherImages.image4}
                  imageAlt={this.state.loadedCar.otherImages.carName}
                  switchSides
                  fillAvailableSpace
                />
              </div>
            </div>
            <VehicleOverview
              interialColor={this.state.loadedCar.interialColor}
              exterialColor={this.state.loadedCar.exterialColor}
              engine={this.state.loadedCar.engine}
              gas={this.state.loadedCar.gas}
              transmission={this.state.loadedCar.transmission}
              price={this.state.loadedCar.price}
              mileAge={this.state.loadedCar.mileAge}
            />
          </div>
        </Aux>
      );
    }
    return postedCar;
  }
}

export default withRouter(CarDetails);
