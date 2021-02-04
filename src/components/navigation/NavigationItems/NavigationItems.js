import React, { Component } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropNav from "../SideDrawer/DrawerNav/DrawerNav";
import { withRouter } from "react-router-dom";

class navigatioItems extends Component {
  state = {
    isHovered: false,
  };
  hoverHandler = () => {
    this.setState({ isHovered: !this.state.isHovered });
  };
  removeMegaMenuHandler = () => {
    this.setState({ isHovered: false });
  };
  showMegaMenuHandler = () => {
    this.setState({ isHovered: true });
  };
  servicesClickHandler = () => {
    this.props.history.goBack();
    this.setState({ isHovered: true });
  };
  render() {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          Home
        </NavigationItem>
        <NavigationItem
          link="/services"
          hovered={this.hoverHandler}
          noHover={this.hoverHandler}
          clicked={this.servicesClickHandler}
        >
          Services
        </NavigationItem>
        <NavigationItem link="/contact">Contact</NavigationItem>
        <NavigationItem link="/about">About</NavigationItem>
        <FontAwesomeIcon icon={faSearch} />
        {/* ______________ Dropdown Menu________ */}
        <div
          className={
            this.state.isHovered ? classes.MegaMenu : classes.Disactive
          }
          onMouseEnter={this.showMegaMenuHandler}
          onMouseLeave={this.removeMegaMenuHandler}
        >
          <DropNav icon="fa fa-bank" link="/hotels" close={this.props.close}>
            Hotels
          </DropNav>
          <DropNav
            icon="fa fa-fort-awesome"
            link="/appartements"
            close={this.props.close}
          >
            Appartements
          </DropNav>
          <DropNav icon="fa fa-car" link="/cars" close={this.props.close}>
            Cars
          </DropNav>
          <DropNav
            icon="fa fa-ship"
            link="/travelling"
            close={this.props.close}
          >
            Tourism / Travel
          </DropNav>
          <DropNav
            icon="fa fa-language"
            link="/events"
            close={this.props.close}
          >
            Events
          </DropNav>
        </div>
        {/* ______________ END __Dropdown Menu________ */}
      </ul>
    );
  }
}

export default withRouter(navigatioItems);
