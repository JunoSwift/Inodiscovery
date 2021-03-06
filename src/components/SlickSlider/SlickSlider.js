import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./SlickSlider.module.css";
import hotel from "../../assets/Images/hotels/yueyeuyeie.jpg";
import HotelCard from "../Services/Hotels/HotelCard/HotelCard";
export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className={classes.SlickWrap}>
        <Slider {...settings}>
          {/*
          -------------here you can paste your Items to be displayed-----------
          
          <HotelCard image={hotel} />
          <HotelCard image={hotel} />
          <HotelCard image={hotel} /> 
          */}
          {this.props.children}
        </Slider>
      </div>
    );
  }
}
