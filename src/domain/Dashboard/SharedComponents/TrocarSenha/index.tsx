import { useRef, useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { RiLockPasswordLine } from "react-icons/ri"
import { AiOutlineReload } from "react-icons/ai"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MoradoresService from "services/MoradoresService"
import useAlert from "hooks/useAlert"
import styles from "./styles.module.css"

const formSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório' }).min(2, { message: 'Campo precisa ter mais que 2 caracteres' }).max(50),
  password: z.string({ required_error: 'Campo obrigatório' }),
  new_password: z.string({ required_error: 'Campo obrigatório' }),
}).superRefine(({ new_password, password }, ctx) => {
  if (new_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas precisam ser iguais."
    });
  }
})

interface Props {
  name?: string
  hashCode?: string
}

export default function TrocarSenha({ name, hashCode }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { setAlert } = useAlert()
  const formInstance = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      await MoradoresService.changePassword(name ?? values.name, values.new_password, hashCode)

      setAlert({
        message: "Senha alterada com sucesso",
        type: "success"
      })
      if (router.pathname === '/forgot-password') {
        router.push('/login')
      }

    } catch (error) {
      setAlert({
        message: "Algo deu errao na troca de senha",
        type: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl text-center">Trocar senha</h2>
      <Form {...formInstance}>
        <form onSubmit={formInstance.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={formInstance.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input className="text-light-bg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formInstance.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel> <RiLockPasswordLine className="inline" /> Nova senha</FormLabel>
                <FormControl>
                  <Input className="text-light-bg" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formInstance.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel><RiLockPasswordLine className="inline" /> Confirmar Senha</FormLabel>
                <FormControl>
                  <Input className="text-light-bg" type="password"{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full text-lg">
            {loading && <AiOutlineReload className="mr-2 animate-spin" />}
            Trocar
          </Button>
        </form>
      </Form>
    </div>
  )
}
