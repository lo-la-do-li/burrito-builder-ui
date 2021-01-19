import React, { Component } from "react";
import { postOrder } from "../../apiCalls";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: "",
      ingredients: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name !== "" && this.state.ingredients.length) {
      postOrder(this.state.name, this.state.ingredients).then((response) =>
        this.props.addOrder(response)
      );
    } else {
      alert("Please enter your name and at least 1 ingredient");
    }
    this.clearInputs();
  };

  handleNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleIngredientChange = (e) => {
    e.preventDefault();
    let ingredient = e.target.name;
    this.setState({
      ingredients: [...this.state.ingredients, ingredient],
    });
  };

  clearInputs = () => {
    this.setState({ name: "", ingredients: [] });
  };

  render() {
    const possibleIngredients = [
      "beans",
      "steak",
      "carnitas",
      "sofritas",
      "lettuce",
      "queso fresco",
      "pico de gallo",
      "hot sauce",
      "guacamole",
      "jalapenos",
      "cilantro",
      "sour cream",
    ];
    const ingredientButtons = possibleIngredients.map((ingredient) => {
      return (
        <button
          key={ingredient}
          name={ingredient}
          onClick={(e) => this.handleIngredientChange(e)}
        >
          {ingredient}
        </button>
      );
    });

    return (
      <form aria-label="order-form">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.state.name}
          onChange={(e) => this.handleNameChange(e)}
        />

        {ingredientButtons}

        <p aria-label="order-message">
          Order: {this.state.ingredients.join(", ") || "Nothing selected"}
        </p>

        <button onClick={(e) => this.handleSubmit(e)}>Submit Order</button>
      </form>
    );
  }
}

export default OrderForm;
