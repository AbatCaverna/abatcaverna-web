import { useRef } from "react";
import { useRouter } from "next/router";
import { MdAttachMoney } from "react-icons/md"
import { TiTag } from "react-icons/ti";

import Input from "components/Shared/Input";
import ProdutosService from "services/ProdutosService";
import useAlert from "hooks/useAlert";

import styles from "./styles.module.css"

export default function CriarProduto() {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const { setAlert } = useAlert()

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
      
      await ProdutosService.createProduct(
        payload.name,
        payload.value,
        payload.description
      )

      router.push('/dashboard/produtos')
    } catch (error) {
      setAlert({
        message: "Erro ao criar um produto",
        type: "error"
      })
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