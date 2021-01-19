import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import OrderForm from "./OrderForm";
// import Orders from "../Orders/Orders";
import { postOrder } from "../../apiCalls";
jest.mock("../../apiCalls");

describe("OrderForm", () => {
  let ingredients,
    name,
    nameInput,
    mockAddOrder,
    beansBtn,
    cilantroBtn,
    sofritasBtn,
    noOrderMsg;
  beforeEach(() => {
    ingredients = ["beans", "cilantro", "sofritas"];
    name = "Lola";
    postOrder.mockResolvedValueOnce({ name: name, ingredients: ingredients });
    mockAddOrder = jest.fn();
    render(<OrderForm addOrder={mockAddOrder} />);
    nameInput = screen.getByRole("textbox");
    beansBtn = screen.getByRole("button", { name: /beans/i });
    cilantroBtn = screen.getByRole("button", {
      name: /cilantro/i,
    });
    sofritasBtn = screen.getByRole("button", { name: /sofritas/i });
    noOrderMsg = screen.queryByText(/order: nothing selected/i);
  });
  it("should render a form with a name input and 12 ingredient buttons", () => {
    expect(nameInput).toBeInTheDocument();
    expect(beansBtn).toBeInTheDocument();
    expect(cilantroBtn).toBeInTheDocument();
    expect(sofritasBtn).toBeInTheDocument();
  });
  it("should update name property in state based on user input", () => {
    expect(nameInput.value).toBe("");

    fireEvent.change(nameInput, { target: { value: "Lola" } });

    expect(nameInput.value).toBe("Lola");
  });
  it("should start without any ingredients in the order", () => {
    expect(noOrderMsg).toBeInTheDocument();
  });
  it("should update ingredients property in state on button click", () => {
    fireEvent.click(beansBtn);
    fireEvent.click(cilantroBtn);
    fireEvent.click(sofritasBtn);
    let yesOrderMsg = screen.getByText(/order: beans, cilantro, sofritas/i);
    expect(noOrderMsg).not.toBeInTheDocument;
    expect(yesOrderMsg).toBeInTheDocument();
  });
  it("should call addOrder when Submit Order button is clicked", async () => {
    const submitBtn = screen.getByRole("button", { name: /submit order/i });

    fireEvent.change(nameInput, { target: { value: "Lola" } });
    fireEvent.click(beansBtn);
    fireEvent.click(cilantroBtn);
    fireEvent.click(sofritasBtn);
    fireEvent.click(submitBtn);

    expect(mockAddOrder).toHaveBeenCalledTimes(1);
    expect(mockAddOrder).toHaveBeenCalledWith();
  });
});
