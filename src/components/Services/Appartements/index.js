import React, { Component } from "react";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Footer from "../../Footer/Footer";
import Appartement from "./AppartementsCard/AppartementCard";
import classes from "./index.module.css";
import bg from "../../../assets/Images/hotels/sld6.jpg";
import Spinner from "../../UI/Spinner/Spinner2";
import axios from "../../../hoc/Axios/Axios";

class appartment extends Component {
  state = {
    appartments: [],
    isLoading: true,
  };
  componentDidMount() {
    axios
      .get("/appartments.json")
      .then((res) => {
        let appartObj = null;
        const appartments = [];
        for (let key in res.data) {
          appartObj = { ...res.data[key], id: key };
          appartments.push(appartObj);
        }
        this.setState({ appartments: appartments });
        if (res) {
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }
  goToAppartment = (id) => {
    this.props.history.push("/appartment/view/" + id);
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
    let appartments = null;
    if (this.state.isLoading) {
      appartments = <Spinner />;
    } else {
      if (this.state.appartments) {
        let image = null;
        appartments = this.state.appartments.map((appartment) => {
          for (const key in appartment.images) {
            image = appartment.images[key].src;
          }
          return (
            <Appartement
              key={appartment.appartmentName}
              image={image}
              appartName={appartment.appartmentName}
              location={appartment.address.location}
              miniCost={appartment.minimumCost}
              clicked={() => this.goToAppartment(appartment.id)}
            />
          );
        });
      } else {
        appartments = "No network";
      }
    }
    return (
      <Aux>
        <div className={classes.Hotels}>
          <div style={style}>
            <div className={classes.Bg}></div>
          </div>
          <div className={classes.TopAppartements}>
            <h1>Appartements </h1>
            <p>
              Here you are ,Thank you for choosing Ino Discovery. You can choose
              your affordable appartement here
            </p>
          </div>
          <div className={classes.HotelsHolder}>
            {appartments}
            <Appartement clicked={() => this.goToAppartment(4)} />
            <Appartement />
            <Appartement />
            <Appartement />
            <Appartement />
          </div>
        </div>
        <Footer />
      </Aux>
    );
  }
}
export default appartment;
