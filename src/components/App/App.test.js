import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";
import OrderForm from "../OrderForm/OrderForm";
import { getOrders } from "../../apiCalls";
jest.mock("../../apiCalls");

const mockOrders = [
  {
    id: 1,
    name: "Lola",
    ingredients: ["beans, cilantro"],
  },
  {
    id: 2,
    name: "Steph",
    ingredients: ["steak, pico de gallo"],
  },
];

describe("App", () => {
  it("renders a Burrito Builder heading", () => {
    getOrders.mockResolvedValue(mockOrders);
    render(<App />);
    const heading = screen.getByRole("heading", {
      name: /burrito builder/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("renders an OrderForm and past Orders", async () => {
    getOrders.mockResolvedValue(mockOrders);
    render(<App />);
    const form = await waitFor(() =>
      screen.getByRole("form", { name: /order\-form/i })
    );
    const name1 = screen.getByText("Lola");
    const name2 = screen.getByText("Steph");
    const order1Ingredient1 = screen.getAllByText("beans");
    const order2Ingredient2 = screen.getAllByText("pico de gallo");

    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(order1Ingredient1).toBeInTheDocument();
    expect(order2Ingredient2).toBeInTheDocument();
  });
  it("should call addOrder when Submit Order button is clicked", async () => {
    getOrders.mockResolvedValue(mockOrders);
    render(<App />);
    const submitBtn = screen.getByRole("button", { name: /submit order/i });
    const nameInput = screen.getByRole("textbox");
    fireEvent.change(nameInput, { target: { value: "Lola" } });
    fireEvent.click(cilantroBtn);
    fireEvent.click(submitBtn);

    getOrders.mockResolvedValueOnce([
      ...mockOrders,
      { name: "Lola", ingredients: ["cilantro"], id: 3 },
    ]);

    const lolaOrder = await waitFor(() =>
      screen.getByRole("heading", { name: /lola/i })
    );
    expect(lolaOrder).toBeInTheDocument();
  });
});
