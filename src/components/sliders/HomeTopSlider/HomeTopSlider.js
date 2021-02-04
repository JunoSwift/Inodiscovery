import React from "react";
import classes from "./HomeTopSlider.module.css";
import bg from "../../../assets/Images/banners/digitalmark.jpg";
import img1 from "../../../assets/Images/2017-Toyota-National-Clearance-Event-Lease-and-Finance-Offers-Bangor-ME_o.jpg";
import "react-animated-slider/build/horizontal.css";
import Slider from "react-animated-slider";

const homeTopSlider = (props) => {
  const content = [
    {
      title: "Access to Digital fast services",
      description:
        "You have to directly select the service focusing on your wishe for navigation",
      button: "Read More",
      image: bg,
      user: "Luan Gjokaj",
      userProfile: "https://i.imgur.com/JSW6mEk.png",
    },
    {
      title: "Tortor Dapibus Commodo Aenean Quam",
      description:
        "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
      button: "Discover",
      image: "https://i.imgur.com/DCdBXcq.jpg",
      user: "Erich Behrens",
      userProfile: "https://i.imgur.com/0Clfnu7.png",
    },
    {
      title: "CARS Sells/Rent Deal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
      button: "Let's Deal Now",
      image: img1,
      user: "Bruno Vizovskyy",
      userProfile: "https://i.imgur.com/4KeKvtH.png",
    },
    {
      title: "Ino Discovery services and  Properties Deal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
      button: "Buy now",
      image: "https://i.imgur.com/DvmN8Hx.jpg",
      user: "Bruno Vizovskyy",
      userProfile: "https://i.imgur.com/4KeKvtH.png",
    },
  ];

  return (
    <Slider autoplay={3200}>
      {content.map((item, index) => (
        <div
          key={index}
          style={{
            background: `url('${item.image}') center/cover no-repeat  `,
            zIndex: "0",
          }}
          className={classes.HomeSlider}
        >
          <div className={classes.BackdroTop}></div>
          <div className={classes.SliderContent}>
            <h2>{item.title}</h2>
            <div>{item.description}</div>
            <button>{item.button}</button>
          </div>
        </div>
      ))}
    </Slider>
  );
};
export default homeTopSlider;
