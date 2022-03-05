import SortSelect from "./SortSelect";
import { render, fireEvent, screen, getByTestId } from "@testing-library/react";

const OPTIONS = [
  {
    value: "date_dsc",
    text: "Date From Latest",
    sort: jest.fn(),
  },
  {
    value: "date_asc",
    text: "Date From Oldest",
    sort: jest.fn(),
  },
  {
    value: "completed_first",
    text: "Completed first",
    sort: jest.fn(),
  },
  {
    value: "not_completed_first",
    text: "Non-Completed first",
    sort: jest.fn(),
  },
];

describe("test SortSelect Component", () => {
  it("render correctly", () => {
    render(
      <SortSelect
        sort={OPTIONS[0].value}
        options={OPTIONS}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText("Date From Latest")).toBeInTheDocument();
  });
});
