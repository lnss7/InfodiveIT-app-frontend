import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs";

function renderTabs(props?: Partial<React.ComponentProps<typeof Tabs>>) {
  return render(
    <Tabs defaultValue="a" {...props}>
      <TabsList>
        <TabsTrigger value="a">Aba A</TabsTrigger>
        <TabsTrigger value="b">Aba B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Conteúdo A</TabsContent>
      <TabsContent value="b">Conteúdo B</TabsContent>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("renderiza a tablist e os triggers", () => {
    renderTabs();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
  });

  it("mostra apenas o conteúdo da aba ativa (defaultValue)", () => {
    renderTabs();
    expect(screen.getByText("Conteúdo A")).toBeInTheDocument();
    expect(screen.queryByText("Conteúdo B")).not.toBeInTheDocument();
  });

  it("marca a aba ativa com aria-selected", () => {
    renderTabs();
    expect(screen.getByRole("tab", { name: "Aba A" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: "Aba B" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("troca de aba ao clicar (não-controlado)", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole("tab", { name: "Aba B" }));

    expect(screen.getByText("Conteúdo B")).toBeInTheDocument();
    expect(screen.queryByText("Conteúdo A")).not.toBeInTheDocument();
  });

  it("respeita o modo controlado e dispara onValueChange", async () => {
    const onValueChange = jest.fn();
    const user = userEvent.setup();
    renderTabs({ value: "a", onValueChange });

    await user.click(screen.getByRole("tab", { name: "Aba B" }));

    expect(onValueChange).toHaveBeenCalledWith("b");
    // Controlado: sem atualizar a prop value, o conteúdo permanece em A.
    expect(screen.getByText("Conteúdo A")).toBeInTheDocument();
  });

  it("lança erro quando usado fora de <Tabs>", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TabsContent value="a">Solto</TabsContent>)).toThrow(
      /dentro de <Tabs>/,
    );
    spy.mockRestore();
  });
});
