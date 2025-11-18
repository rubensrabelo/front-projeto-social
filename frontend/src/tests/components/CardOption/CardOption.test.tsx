import { render, screen, fireEvent } from "@testing-library/react";
import CardOption from "../../../Components/CardOption/CardOption";

describe("CardOption Component", () => {
  test("renderiza título e imagem", () => {
    render(<CardOption title="Aluno" image="/img/aluno.png" />);

    expect(screen.getByText("Aluno")).toBeInTheDocument();
    expect(screen.getByAltText("Aluno")).toBeInTheDocument();
  });

  test("executa o onClick ao clicar", () => {
    const handleClick = vi.fn();

    render(<CardOption title="Professor" image="/img/professor.png" onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
