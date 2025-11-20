import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ForgotPassword from "../../../pages/ForgotPassword/ForgotPassword";

let mockType = "professor";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");

  return {
    ...actual,

    useSearchParams: () => [
      {
        get: (key: string) => {
          if (key === "type") return mockType;
          return null;
        },
      },
    ],

    useNavigate: () => mockNavigate,

    Link: ({ to, children }: any) => <a href={to}>{children}</a>,
  };
});

const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

describe("ForgotPassword Page", () => {
  beforeEach(() => {
    consoleSpy.mockClear();
    alertSpy.mockClear();
    mockNavigate.mockClear();
  });

  test("renderiza título e subtítulo corretamente", () => {
    mockType = "professor";

    render(<ForgotPassword />);

    expect(screen.getByText("Recuperar Senha")).toBeInTheDocument();
    expect(
      screen.getByText(/Informe o email associado à sua conta/)
    ).toBeInTheDocument();
    expect(screen.getByText("professor")).toBeInTheDocument();
  });

  test("altera o campo de email corretamente", () => {
    mockType = "coordenador";

    render(<ForgotPassword />);

    const input = screen.getByLabelText("Email");

    fireEvent.change(input, { target: { value: "teste@teste.com" } });

    expect(input).toHaveValue("teste@teste.com");
  });

  test("executa recuperação de senha ao enviar", () => {
    mockType = "professor";

    render(<ForgotPassword />);

    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "user@teste.com" } });

    const button = screen.getByRole("button", {
      name: "Enviar recuperação",
    });

    fireEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Password recovery request:",
      "user@teste.com"
    );

    expect(alertSpy).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith("/login?type=professor");
  });

  test('mostra link "Voltar ao login" com href correto', () => {
    mockType = "coordenador";

    render(<ForgotPassword />);

    const link = screen.getByText("Voltar ao login");

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login?type=coordenador");
  });
});
