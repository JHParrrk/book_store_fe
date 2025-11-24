import { render, screen } from "@testing-library/react";
import Button from "./button";
import { BookStoreThemeProvider } from "../../contexts/themeContext";

describe("Button 컴포넌트 테스트", () => {
  it("렌더 확인", () => {
    render(
      <BookStoreThemeProvider>
        <Button size={"large"} scheme={"primary"}>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );
    expect(screen.getByText("버튼")).toBeInTheDocument();
  });

  it("size props 적용", () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme={"primary"}>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole("button")).toHaveStyle({ fontSize: "1.5rem" });
  });

  it("color props 적용", () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme={"primary"}>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole("button")).toHaveStyle({ color: "white" });
  });

  it("disabled props 적용", () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme={"primary"} disabled={false}>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole("button")).toHaveProperty("disabled");
  });
});
