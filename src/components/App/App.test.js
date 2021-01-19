import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";
import OrderForm from "../OrderForm/OrderForm";
import { postOrder, getOrder } from "..apiCalls/";
jest.mock("../apiCalls");

it("should call addOrder when Submit Order button is clicked", async () => {
  const submitBtn = screen.getByRole("button", { name: /submit order/i });

  fireEvent.change(nameInput, { target: { value: "Lola" } });
  fireEvent.click(beansBtn);
  fireEvent.click(cilantroBtn);
  fireEvent.click(sofritasBtn);
  fireEvent.click(submitBtn);

  const lolaOrder = await waitFor(() =>
    screen.getByRole("heading", { name: /lola/i })
  );
  expect(mockAddOrder).toHaveBeenCalledTimes(1);
  expect(mockAddOrder).toHaveBeenCalledWith();
});
