import Tree from "@/components/Tree";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("카테고리 목록 통합테스트", () => {
  it("카테고리 컴포넌트 헤더가 존재한다", () => {
    render(<Tree />);
    const title = screen.getByRole("heading");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("카테고리");
  });

  it("카테고리 최초 렌더링 시 자동으로 초기 데이터를 불러온다", async () => {
    render(<Tree />);
    const list = await screen.findAllByRole("listitem");
    expect(list).toHaveLength(3);
    expect(screen.getByText("Category 3")).toBeInTheDocument();
  });

  it("특정 카테고리를 클릭하면 하위 카테고리 데이터를 불러온다", async () => {
    await waitFor(() => render(<Tree />));
    const user = userEvent.setup();

    expect(screen.getByText("Category 3")).toBeInTheDocument();

    await user.click(screen.getByText("Category 3"));

    expect(screen.getByText("Category 3-1")).toBeInTheDocument();
    expect(screen.getByText("Category 3-2")).toBeInTheDocument();
    expect(screen.getByText("Category 3-3")).toBeInTheDocument();
  });
});

describe("카테고리 생성 통합테스트", () => {
  it("카테고리 추가 버튼을 클릭하면 카테고리 입력창이 나타난다", async () => {
    await waitFor(() => render(<Tree />));
    const user = userEvent.setup();

    // 추가버튼 하나 골라서클릭하기
    const button = screen.getAllByText("추가")[0];
    await user.click(button);

    // 입력창과 생성버튼이 생성되었는지 확인함
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("생성")).toBeInTheDocument();
  });

  it("카테고리 추가 입력창에 글자를 입력하고 생성 버튼을 누르면 새 카테고리가 생성된다", async () => {
    await waitFor(() => render(<Tree />));
    const user = userEvent.setup();

    // input창 열고
    await user.click(screen.getAllByText("추가")[0]);
    // 글자입력
    await user.type(screen.getByRole("textbox"), "카테고리 테스트폴더");
    // 생성 버튼 클릭
    await user.click(screen.getByText("생성"));

    // 생성 성공 응답이 왔는지 확인 (response)
    // 어떻게?? response데이터가 들어있는지 확인? 브라우저에 특정 id값이 렌더링되는지 확인?
    expect(screen.getByText("카테고리 테스트폴더")).toBeInTheDocument();
  });

  it("카테고리명을 적지 않고 생성하면 생성에 실패한다", async () => {
    // await waitFor(() => render(<Tree />));
    // const user = userEvent.setup();
    // // input창 열고
    // await user.click(screen.getAllByText("추가")[0]);
    // // 아무것도 입력 안하고 생성 버튼 클릭
    // await user.click(screen.getByText("생성"));
  });
});
