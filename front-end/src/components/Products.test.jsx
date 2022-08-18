import { render, screen } from '@testing-library/react';
import React from 'react';
import { unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import Products from './Products';
import MockProductItem from './ProductItem';

jest.mock('./ProductItem', () => {
  return function DummyProductItem(props) {
    return (<tr>
      <td data-testid={`item-id-${props.id}`}>ID {props.id}</td>
      <td data-testid={`item-name-${props.id}`}>Name {props.id}</td>
      <td data-testid={`item-status-${props.id}`}>Status {props.id}</td>
    </tr>
    );
  };
});

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

describe('Products component', () => {
  it('should render table header', () => {
    act(() => {
      render(
        <Products />,
        container
      )
    });

    expect(screen.getByTestId('th-product')).toHaveTextContent('Product');
    expect(screen.getByTestId('th-temperature')).toHaveTextContent('Temperature');
    expect(screen.getByTestId('th-status')).toHaveTextContent('Status');
  });

  it('should render 6 Product Items', () => {
    act(() => {
      render(
        <Products />,
        container
      )
    });

    expect(screen.getByTestId('item-id-1')).toHaveTextContent("ID 1");
    expect(screen.getByTestId('item-name-1')).toHaveTextContent("Name 1");
    expect(screen.getByTestId('item-status-1')).toHaveTextContent("Status 1");
    
    expect(screen.getByTestId('item-id-2')).toHaveTextContent("ID 2");
    expect(screen.getByTestId('item-name-2')).toHaveTextContent("Name 2");
    expect(screen.getByTestId('item-status-2')).toHaveTextContent("Status 2");
    
    expect(screen.getByTestId('item-id-3')).toHaveTextContent("ID 3");
    expect(screen.getByTestId('item-name-3')).toHaveTextContent("Name 3");
    expect(screen.getByTestId('item-status-3')).toHaveTextContent("Status 3");
    
    expect(screen.getByTestId('item-id-4')).toHaveTextContent("ID 4");
    expect(screen.getByTestId('item-name-4')).toHaveTextContent("Name 4");
    expect(screen.getByTestId('item-status-4')).toHaveTextContent("Status 4");
    
    expect(screen.getByTestId('item-id-5')).toHaveTextContent("ID 5");
    expect(screen.getByTestId('item-name-5')).toHaveTextContent("Name 5");
    expect(screen.getByTestId('item-status-5')).toHaveTextContent("Status 5");
    
    expect(screen.getByTestId('item-id-6')).toHaveTextContent("ID 6");
    expect(screen.getByTestId('item-name-6')).toHaveTextContent("Name 6");
    expect(screen.getByTestId('item-status-6')).toHaveTextContent("Status 6");
  });
});