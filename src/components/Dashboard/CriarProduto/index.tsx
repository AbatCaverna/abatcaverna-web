import Input from "../../Shared/Input";
import { TiTag } from "react-icons/ti";
import { MdAttachMoney } from "react-icons/md"
import styles from "./styles.module.css"
import { useRef } from "react";
import ProdutosService from "../../../services/ProdutosService";
import { useRouter } from "next/router";

export default function CriarProduto() {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLInputElement>(null)
  const produtosService = new ProdutosService()
  const router = useRouter()

  async function handleCreateProduct() {
    try {
      const valueString = valueRef.current?.value
      const value = valueString?.replace('R$', '')
        .replace('.', '')
        .replace(',', '')

      if (!nameRef.current) return

      const payload = {
        name: nameRef.current.value,
        description: descriptionRef.current?.value,
        value: Number(value)
      }
      
      await produtosService.createProduct(
        payload.name,
        payload.value,
        payload.description
      )

      router.push('/dashboard/produtos')
    } catch (error) {
      alert("Erro ao criar um produto")
    }
  }
  return (
    <div>
      <h1>Criar produto</h1>
      <div className={styles.content}>
        <h2>Detalhes do produto</h2>
        <div>
          <Input
            type="text"
            name="name"
            label="Nome do produto"
            icon={TiTag}
            ref={nameRef}
          />
          <Input
            type="text"
            name="description"
            label="Descrição do produto"
            icon={TiTag}
            ref={descriptionRef}
          />
          <Input
            type="text"
            name="value"
            label="Valor do produto"
            icon={MdAttachMoney}
            ref={valueRef}
          />
          <button type="button" onClick={handleCreateProduct}>Criar produto</button>
        </div>
      </div>
    </div>
  );
}