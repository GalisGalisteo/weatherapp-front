import LoadingIcon from "@/components/common/LoadingIcon";
import { render, screen } from "@testing-library/react";

jest.mock("@/assets/loading.svg", () => "test-file-stub");

describe("LoadingIcon component", () => {
  test("renders LoadingIcon with correct attributes", () => {
    render(<LoadingIcon />);
    const imageElement = screen.getByAltText(/Loading.../i);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "test-file-stub");
    expect(imageElement).toHaveClass("animate-ping");
  });
});
