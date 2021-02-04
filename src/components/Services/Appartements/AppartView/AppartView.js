import React, { Component } from "react";
import axios from "../../../../hoc/Axios/Axios";
import classes from "./AppartView.module.css";
import { Carousel } from "react-responsive-carousel";
import Spinner from "../../../UI/Spinner/Spinner2";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import Footer from "../../../Footer/Footer";
import Appartment from "../AppartementsCard/AppartementCard";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import { withRouter } from "react-router-dom";

class AppartementView extends Component {
  state = {
    appartments: [],
    appartmentsList: null,
    isLoading: true,
  };
  appartmentsView = (paramsId) => {
    if (paramsId) {
      if (
        !this.state.appartments ||
        (this.state.appartments && this.state.appartments.id !== paramsId)
      ) {
        axios
          .get("/appartments/" + paramsId + ".json")
          .then((res) => {
            if (res) {
              this.setState({ appartments: res.data });
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
  appartmentsRecommend = () => {
    if (!this.state.appartmentsList) {
      axios
        .get("/appartments.json")
        .then((res) => {
          const datas = [];
          for (const key in res.data) {
            datas.push({
              ...res.data[key],
              id: key,
            });
          }
          this.setState({ appartmentsList: datas });
          if (res) {
            this.setState({ isLoading: false });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false });
        });
    }
  };
  goToAppartment = (id) => {
    this.props.history.push("/appartment/view/" + id);
    this.appartmentsView(id);
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.appartmentsView(id);
    this.appartmentsRecommend();
  }

  render() {
    let appartImages;
    let appartments = [];
    const images = [];
    const facilities = [];
    const address = [];
    let appartmentRecommenation = <Spinner />;

    let appartmentView = (
      <p
        style={{
          margin: "auto",
          width: "100%",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        Wait....!
      </p>
    );
    if (this.props.match.params.id) {
      appartmentView = <Spinner />;
    }
    if (this.state.appartments) {
      for (const key in this.state.appartments.images) {
        images.push(this.state.appartments.images[key]);
      }
      for (const key in this.state.appartments.facilities) {
        facilities.push({ ...this.state.appartments.facilities });
      }
      for (const key in this.state.appartments.address) {
        address.push({ ...this.state.appartments.address });
        break;
      }
      appartments.push(this.state.appartments);
      appartImages = images.map((img, index) => (
        <div key={index} data-src={img.src} />
      ));
      if (this.state.appartmentsList) {
        appartmentRecommenation = this.state.appartmentsList.map((apprt) => (
          <Appartment
            key={apprt.appartmentName}
            appartName={apprt.appartmentName}
            image={apprt.image}
            location={apprt.address.location}
            miniCost={apprt.minimumCost}
            clicked={() => this.goToAppartment(apprt.id)}
          />
        ));
      }
      appartmentView = (
        <Aux>
          <div className={classes.Content}>
            <h2>{this.state.appartments.appartmentName}</h2>
            <AwesomeSlider>{appartImages}</AwesomeSlider>

            <p className={classes.Address}>
              <h3>Address:</h3>
              <span>Email:</span>
              {address.map((adrs) => adrs.email)}
              <span className={classes.aa}>phone:</span>
              {address.map((adrs) => adrs.phone)}
              <span className={classes.aa}>Website:</span>
              {address.map((adrs) => adrs.website)}
            </p>
            <h3>Location:</h3>
            <p>{address.map((adrs) => adrs.location)}</p>
            <h3>More Details:</h3>
            <p>{this.state.appartments.details}</p>
            <h2>RECOMMENDED Appartments</h2>
            <div className={classes.Recommendation}>
              {appartmentRecommenation}
            </div>
          </div>
        </Aux>
      );
    } else {
      appartmentView = "No Internet";
    }
    return (
      <Aux>
        <div className={classes.BgHeader}>
          <img src="https://mcdn.wallpapersafari.com/medium/28/81/uCfAZm.jpg" />
        </div>
        <div className={classes.AppartmentViewWrap}>
          <div className={classes.Section1}>
            <div className={classes.AdsLeft}></div>
            {appartmentView}
            <div className={classes.AdsRight}></div>
          </div>
        </div>

        <Footer />
      </Aux>
    );
  }
}

export default withRouter(AppartementView);
