import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectField, type SelectOption } from "../select-field";

const options: SelectOption[] = [
  { value: "ibm", label: "IBM" },
  { value: "veeam", label: "Veeam" },
  { value: "dell", label: "Dell" },
];

describe("SelectField", () => {
  it("renderiza com o placeholder quando não há valor", () => {
    render(
      <SelectField
        value=""
        onChange={() => {}}
        options={options}
        placeholder="Selecione o fabricante"
      />,
    );
    expect(screen.getByText("Selecione o fabricante")).toBeInTheDocument();
  });

  it("exibe a label da opção selecionada", () => {
    render(<SelectField value="veeam" onChange={() => {}} options={options} />);
    expect(screen.getByText("Veeam")).toBeInTheDocument();
  });

  it("começa fechado (aria-expanded=false)", () => {
    render(<SelectField value="" onChange={() => {}} options={options} />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("abre a lista de opções ao clicar", async () => {
    const user = userEvent.setup();
    render(<SelectField value="" onChange={() => {}} options={options} />);

    await user.click(screen.getByRole("button", { name: /selecione/i }));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(options.length);
  });

  it("chama onChange com o valor selecionado e fecha", async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(
      <SelectField value="" onChange={handleChange} options={options} />,
    );

    await user.click(screen.getByRole("button", { name: /selecione/i }));
    // O elemento com role "option" é o <li>; o handler de clique vive no
    // <button> interno, então clicamos no botão da opção.
    await user.click(screen.getByRole("button", { name: "Dell" }));

    expect(handleChange).toHaveBeenCalledWith("dell");
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /selecione/i }),
      ).toHaveAttribute("aria-expanded", "false"),
    );
  });

  it("não abre quando desabilitado", async () => {
    const user = userEvent.setup();
    render(
      <SelectField value="" onChange={() => {}} options={options} disabled />,
    );

    await user.click(screen.getByRole("button"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("reflete o estado inválido em aria-invalid", () => {
    render(
      <SelectField value="" onChange={() => {}} options={options} invalid />,
    );
    expect(screen.getByRole("button")).toHaveAttribute("aria-invalid", "true");
  });

  it("fecha ao pressionar Escape", async () => {
    const user = userEvent.setup();
    render(<SelectField value="" onChange={() => {}} options={options} />);

    const button = screen.getByRole("button");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(button).toHaveAttribute("aria-expanded", "false"),
    );
  });

  it("aplica aria-label quando fornecida", () => {
    render(
      <SelectField
        value=""
        onChange={() => {}}
        options={options}
        ariaLabel="Filtro de fabricante"
      />,
    );
    expect(
      screen.getByRole("button", { name: "Filtro de fabricante" }),
    ).toBeInTheDocument();
  });
});
