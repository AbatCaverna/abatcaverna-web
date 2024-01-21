import CriarProduto from "domain/Dashboard/CriarProduto";
import { DashboardLayout } from "domain/Dashboard/SharedComponents";

export default function CriarProdutoPage() {
  return (
    <DashboardLayout>
      <CriarProduto />
    </DashboardLayout>
  );
}
