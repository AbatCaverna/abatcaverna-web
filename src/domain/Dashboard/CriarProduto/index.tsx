import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { MdAttachMoney, MdFileUpload } from "react-icons/md"
import { TiTag } from "react-icons/ti";

import { Button } from "@/components/ui/button";
import Input from "domain/Shared/Input";
import ProdutosService from "services/ProdutosService";
import useAlert from "hooks/useAlert";

import styles from "./styles.module.css"

export default function CriarProduto() {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const { setAlert } = useAlert()
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      const objectUrl = URL.createObjectURL(e.target.files[0])
      setPreview(objectUrl)
    }
  }

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

      let image = ''

      if (file) {
        const imageUpload = await ProdutosService.uploadProductImage(file)
        image = imageUpload.data.image_url
      }

      await ProdutosService.createProduct(
        payload.name,
        payload.value,
        payload.description,
        [image]
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

          {preview && (
            <Image src={preview} alt="Upload previe" width={250} height={350} />
          )}

          <Input
            type="file"
            name="file"
            label="Insira uma imagem do prodtuo"
            icon={MdFileUpload}
            onChange={handleFileChange}
          />
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
          <Button type="button" onClick={handleCreateProduct}>Criar produto</Button>
        </div>
      </div>
    </div>
  );
}
