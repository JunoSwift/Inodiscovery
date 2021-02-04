import React from "react";
import { Component } from "react";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Deal from "./Deal/Deal";
import classes from "./Deals.module.css";
import { withRouter } from "react-router-dom";
import axios from "../../../../hoc/Axios/Axios";
import Spinner from "../../../UI/Spinner/Spinner";

class Deals extends Component {
  state = {
    cars: [],
    error: false,
  };
  dealSelectedHandler = (id) => {
    this.props.history.push({ pathname: "cars/" + id });
  };
  componentDidMount() {
    axios
      .get("/cars.json")
      .then((response) => {
        console.log(response.data);
        const result = [];
        for (let i in response.data) {
          result.push(response.data[i]);
        }
        this.setState({ cars: result });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }
  render() {
    let carItems = null;
    if (!this.state.cars) {
      carItems = <Spinner />;
    }
    if (this.state.cars) {
      carItems = this.state.cars.map((car) => (
        <Deal
          key={car.id}
          carName={car.carName}
          price={car.price}
          carDetails={car.carDetails}
          images={car.images}
          clicked={() => this.dealSelectedHandler(car.id)}
        />
      ));
    }

    return (
      <Aux>
        <p>Deals</p>
        <section className={classes.Deals}>{carItems}</section>
      </Aux>
    );
  }
}

export default withRouter(Deals);
