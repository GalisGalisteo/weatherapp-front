import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/common/Button";

describe("Button component", () => {
  test("renders Button with default props", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("bg-primary");
    expect(buttonElement).toHaveClass("hover:bg-primary-light");
  });

  test("applies custom className", () => {
    render(<Button className="custom-class">Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toHaveClass("custom-class");
  });

  test("applies custom bgColor and hoverColor", () => {
    render(
      <Button bgColor="bg-secondary" hoverColor="hover:bg-secondary-light">
        Click me
      </Button>
    );
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toHaveClass("bg-secondary");
    expect(buttonElement).toHaveClass("hover:bg-secondary-light");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
