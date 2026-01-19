describe("CommentItem", () => {
  it.todo("renders CommentItem");
});

// import { render, screen } from "@testing-library/react";
// import React from "react";
// import CommentItem from "../CommentItem";
// //1,2번 수정예정
// describe("CommentItem", () => {
//   test("옵션 아이콘이 렌더링되지 않는가 (기본 상태)", () => {
//     render(<CommentItem />);

//     const optionsIcon = screen.queryByTestId("options-icon");
//     expect(optionsIcon).toBeNull();
//   });

//   test("옵션 아이콘이 렌더링되는가 (댓글쓴이가인 경우)", () => {
//     jest.spyOn(React, "useState").mockReturnValue([true, jest.fn()]);

//     render(<CommentItem />);

//     const optionsIcon = screen.getByTestId("options-icon");
//     expect(optionsIcon).toBeInTheDocument();
//   });

//   test("댓글 작성자와 내용, 시간은 정상적으로 렌더링되는가", () => {
//     render(<CommentItem />);

//     expect(screen.getByText("최은재")).toBeInTheDocument();
//     expect(screen.getByText("wow great post")).toBeInTheDocument();
//     expect(screen.getByText("00분전")).toBeInTheDocument();
//   });
// });
