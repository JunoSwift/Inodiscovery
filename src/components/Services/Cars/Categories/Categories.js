import classes from "./Categories.module.css";
import React from "react";
import Category from "../Categories/Category/Category";
import Aux from "../../../../hoc/Auxilliary/Auxilliary";
import { Link } from "react-router-dom";
import { Component } from "react";
import axios from "../../../../hoc/Axios/Axios";
class Categories extends Component {
  state = {
    categories: [],
    error: false,
  };
  componentDidMount() {
    axios
      .get("/cars.json")
      .then((response) => {
        let result = [];
        for (let i in response.data) {
          result.push(response.data[i].carName);
        }
        this.setState({ categories: result });
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  }
  numberOfEveryCategoryHandler = (arr) => {
    return arr.reduce(
      (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
      []
    );
  };
  render() {
    const category = [...new Set(this.state.categories)];
    console.log(category);
    const categories = category.map((category) => {
      return (
        <Link to={"car/" + category} key={category}>
          <Category name={category} />
        </Link>
      );
    });
    return (
      <Aux>
        <p>Categorie</p>
        <div className={classes.Categories}>{categories}</div>
      </Aux>
    );
  }
}

export default Categories;
