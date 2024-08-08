import { render, screen } from "@testing-library/react";
import MainHeader from "@/components/common/MainHeader";

jest.mock("@/assets/logo.png", () => "test-file-stub");

describe("MainHeader component", () => {
  test("renders MainHeader with correct attributes", () => {
    render(<MainHeader />);
    const imageElement = screen.getByAltText(/Logo/i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "test-file-stub");
    expect(imageElement).toHaveClass("mx-auto");

    const linkElement = screen.getByRole("link", { name: /Logo/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
