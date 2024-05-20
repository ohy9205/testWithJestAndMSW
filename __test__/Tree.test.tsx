import Tree from "@/components/Tree";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

let user: UserEvent;

beforeAll(() => {
  user = userEvent.setup();
});

describe("카테고리", () => {
  it("카테고리 컴포넌트가 렌더링된다", async () => {
    render(<Tree />);
    await waitFor(() => {
      expect(screen.getByText("Category 1")).toBeInTheDocument();
      expect(screen.getByText("Category 2")).toBeInTheDocument();
      expect(screen.getByText("Category 3")).toBeInTheDocument();
    });
  });

  it("카테고리를 클릭하면 하위 카테고리를 열고 닫을 수 있다", async () => {
    render(<Tree />);
    const targetCategory = await screen.findByText("Category 3");

    // 카테고리 열기
    user.click(targetCategory);
    await waitFor(() => {
      expect(screen.getByText("Category 3-1")).toBeInTheDocument();
      expect(screen.getByText("Category 3-2")).toBeInTheDocument();
      expect(screen.getByText("Category 3-3")).toBeInTheDocument();
    });

    // 카테고리 닫기
    user.click(targetCategory);
    await waitFor(() => {
      expect(screen.queryByText("Category 3-1")).toBeNull();
      expect(screen.queryByText("Category 3-2")).toBeNull();
      expect(screen.queryByText("Category 3-3")).toBeNull();
    });
  });

  it("카테고리를 추가한다", async () => {
    await waitFor(() => render(<Tree />));

    await user.click(await screen.findByText("Category 1"));
    await user.click(screen.getAllByText("추가")[0]);
    await user.type(screen.getByRole("textbox"), "new category");
    await user.click(screen.getByText("생성"));

    await waitFor(async () => {
      expect(screen.getByText("new category")).toBeInTheDocument();
    });
  });
});
