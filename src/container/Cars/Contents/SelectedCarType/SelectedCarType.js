import React, { Component } from "react";
import classes from "./SelectedCarType.module.css";
import photo from "../../../../assets/Images/2017-Toyota-National-Clearance-Event-Lease-and-Finance-Offers-Bangor-ME_o.jpg";
import SelectedType from "./SelectedType/SelectedType";
import axios from "../../../../hoc/Axios/Axios";
import Spinner from "../../../../components/UI/Spinner/Spinner2";
import Footer from "../../../../components/Footer/Footer";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import { isEmpty } from "lodash";

class SelectedCarType extends Component {
  state = {
    cars: [],
    isModalOpen: false,
    isLoading: true,
  };
  componentDidMount() {
    console.log(this.props);
    const result = [];
    axios.get("/cars.json").then((response) => {
      for (let i in response.data) {
        result.push(response.data[i]);
      }
      this.setState({ cars: result, isLoading: false });
    });
    console.log(result);
  }
  goToDetailsHandler = (id) => {
    this.props.history.push("/carsDetails/" + id);
  };
  render() {
    let selectedCarTypeArr = null;
    if (this.state.isLoading || isEmpty(this.state.cars)) {
      selectedCarTypeArr = <Spinner />;
    } else {
      selectedCarTypeArr = this.state.cars
        .filter(
          (carClicked) =>
            carClicked.carName === this.props.match.params.selectedCarType
        )
        .map((car) => (
          <SelectedType
            key={car.id}
            carPhoto={car.images}
            carName={car.carName}
            carDetails={car.carDetails}
            price={car.price}
            clicked={() => this.goToDetailsHandler(car.id)}
          />
        ));
    }

    return (
      <Aux>
        <div className={classes.SelectedCarType}>
          <div className={classes.ImageContainer}>
            <img src={photo} />
            <div className={classes.FeatherBanner} />
          </div>
          <div className={classes.Car_MainTypeTitle}>
            {this.props.match.params.selectedCarType}(s)
          </div>
          {selectedCarTypeArr}
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default SelectedCarType;
