import { render, waitFor } from "@testing-library/react";
import useFetchData from "@/hooks/useFetchData";

interface TestComponentProps {
  params: string;
}

const TestComponent = ({ params }: TestComponentProps) => {
  const { data, error, loading, refetch } = useFetchData({
    apiCall: async (param: string) => {
      if (param === "error") {
        throw new Error("Test Error");
      }
      return { key: "value" };
    },
    params,
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && <p>Data: {JSON.stringify(data)}</p>}
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

describe("useFetchData", () => {
  it("fetches data successfully", async () => {
    const { getByText } = render(<TestComponent params="test-param" />);

    await waitFor(() => expect(getByText(/Loading.../i)).toBeInTheDocument());
    await waitFor(() =>
      expect(getByText(/Data: {"key":"value"}/i)).toBeInTheDocument()
    );
  });

  it("handles error during data fetching", async () => {
    const { getByText } = render(<TestComponent params="error" />);

    await waitFor(() => expect(getByText(/Loading.../i)).toBeInTheDocument());
    await waitFor(() =>
      expect(
        getByText(/An error occurred. Please try again later./i)
      ).toBeInTheDocument()
    );
  });

  it("refetches data when refetch is called", async () => {
    const { getByText } = render(<TestComponent params="test-param" />);

    await waitFor(() => expect(getByText(/Loading.../i)).toBeInTheDocument());
    await waitFor(() =>
      expect(getByText(/Data: {"key":"value"}/i)).toBeInTheDocument()
    );

    getByText(/Refetch/i).click();

    await waitFor(() => expect(getByText(/Loading.../i)).toBeInTheDocument());
    await waitFor(() =>
      expect(getByText(/Data: {"key":"value"}/i)).toBeInTheDocument()
    );
  });
});
