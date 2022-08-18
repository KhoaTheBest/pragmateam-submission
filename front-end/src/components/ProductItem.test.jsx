import { render, screen, waitFor } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import * as useGetProductTemptHook from '../hooks/useGetProductTempt';
import ProductItem from "./ProductItem";

jest.mock('../hooks/useGetProductTempt');

let container;
beforeEach(() => {
  // Setup render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Clean up render target
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('ProductItem component', () => {
  it('should render Null when product is Null', () => {
    useGetProductTemptHook.useGetProductTempt.mockReturnValue({ query: null });

    act(() => {
      render(<ProductItem id={0} />, container);
    });

    expect(container.firstChild).toBeNull();
  });

  it('should render Null when failed to fetch Product', () => {
    useGetProductTemptHook.useGetProductTempt.mockReturnValue({ query: () => Promise.reject({ message: "Failed to fetch Product" }) });

    act(() => {
      render(<ProductItem id={12} />, container);
    });

    expect(container.firstChild).toBeNull();
  });

  it('should render row with Product Name, Temperature and Status', async () => {
    const fakeProduct = {
      name: "Test Product A",
      temperature: 123,
      status: "All good"
    };

    useGetProductTemptHook.useGetProductTempt.mockReturnValue({ query: () => Promise.resolve(fakeProduct) });

    act(() => {
      render(
        <table>
          <tbody>
            <ProductItem id={12} />
          </tbody>
        </table>,
        container);
    });

    // Wait for UI updates
    await waitFor(() => screen.getByTestId("tr-product"));

    expect(screen.getByTestId("tr-product")).toHaveTextContent(fakeProduct.name);
    expect(screen.getByTestId("tr-temperature")).toHaveTextContent(fakeProduct.temperature);
    expect(screen.getByTestId("tr-status")).toHaveTextContent(fakeProduct.status);
  });
});