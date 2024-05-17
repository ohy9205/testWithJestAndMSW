import Tree from "@/components/Tree";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("카테고리", () => {
  it("카테고리 컴포넌트가 렌더링된다", async () => {
    render(<Tree />);
    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
      expect(screen.getByText("Category 3")).toBeInTheDocument();
    });
  });

  it("특정 카테고리를 클릭하면 하위 카테고리 데이터를 불러온다", async () => {
    render(<Tree />);
    const user = userEvent.setup();

    await user.click(await screen.findByText("Category 3"));
    await waitFor(() => {
      expect(screen.getByText("Category 3")).toBeInTheDocument();
      expect(screen.getByText("Category 3-1")).toBeInTheDocument();
      expect(screen.getByText("Category 3-2")).toBeInTheDocument();
      expect(screen.getByText("Category 3-3")).toBeInTheDocument();
    });
  });

  it("카테고리를 추가한다", async () => {
    render(<Tree />);
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
    });
    await user.click(screen.getAllByText("추가")[0]);
    const input = screen.getByRole("textbox");
    await user.type(input, "new category");
    await user.click(screen.getByText("생성"));
    await user.click(await screen.findByText("Category 1"));

    await waitFor(async () => {
      screen.debug();
      // expect(screen.getByText("Category 3-1")).toBeInTheDocument();
      // expect(screen.getByText("Category 3-2")).toBeInTheDocument();
      expect(screen.getByText("new category")).toBeInTheDocument();
    });
  });
});
