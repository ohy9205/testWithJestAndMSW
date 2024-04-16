import Tree from "@/components/Tree";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// beforeAll(() => server.listen());
// afterAll(() => server.close());

beforeEach(() => render(<Tree />));

describe("카테고리", () => {
  it("카테고리 헤더가 있는지 확인", () => {
    const title = screen.getByRole("heading");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("카테고리");
  });

  it("카테고리 렌더링 시 초기 데이터를 불러오는지 확인", async () => {
    const list = await screen.findAllByRole("listitem");
    expect(list).toHaveLength(3);
  });
});
