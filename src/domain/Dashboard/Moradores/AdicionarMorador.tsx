import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import YearInput from '@/components/ui/year-select'

import MoradoresService from 'services/MoradoresService'
import useAlert from 'hooks/useAlert'

const MoradorSchema = z.object({
  _id: z.string().optional(),
  nome: z.string(),
  apelido: z.string(),
  ano_entrada: z.number().min(2014).max(2114),
  curso: z.string().min(4),
  imagem: z.string(),
  instagram: z.string().url('Precisa ser o link do instagram'),
  role: z.string().optional(),
  token: z.string().optional(),
  email: z.string().optional(), // Optional field
});

type Morador = z.infer<typeof MoradorSchema>;

interface Props {
  initialValues?: Morador
}

function AdicionarMorador({ initialValues }: Props) {
  const { setAlert } = useAlert()
  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(handleCreateMorador, {
    onSuccess: (res) => {
      queryClient.setQueryData('moradores', (old: any) => [...old, res])
      setDialogOpen(false)
    }
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const form = useForm<Morador>({
    resolver: zodResolver(MoradorSchema),
    mode: 'onChange',
  })
  const { errors } = form.formState

  async function handleCreateMorador(formData: FormData) {
    try {
      const response = await MoradoresService.createMorador(formData)
      return response.data.user
    } catch (error) {
      console.error(error)
      setAlert({
        type: 'error',
        title: 'Erro',
        message: 'Para mais informações olhe o console.'
      })
    }
  }

  function onSubmit(values: Morador) {
    console.log('values', values)
    const formData = new FormData()

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'imagem') {
        formData.set(key, selectedFile as File)
      } else {
        formData.set(key, value as any)
      }
    })

    mutate(formData)
  }

  const disableSubmitBtn = isLoading || Object.values(errors).length > 0

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{initialValues ? 'Editar' : 'Adicionar'} morador</Button>
      </DialogTrigger>
      <DialogContent className="bg-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar morador</DialogTitle>
          <DialogDescription>
            Use esse espaço para adicionar um novo morador ao site.
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto max-w-sm space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

              <FormField
                control={form.control}
                name="apelido"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Apelido</FormLabel>
                    <FormControl>
                      <Input
                        id="apelido"
                        placeholder="@"
                        required
                        variant={errors.apelido ? 'error' : 'default'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        id="nome"
                        placeholder="John Doe"
                        required
                        variant={errors.nome ? 'error' : 'default'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ano_entrada"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Data de entrada</FormLabel>
                    <FormControl>
                      <YearInput
                        required
                        onValueChange={(val) => field.onChange(Number(val))}
                        defaultValue={String(field.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="curso"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Curso</FormLabel>
                    <FormControl>
                      <Input
                        id="curso"
                        placeholder="Ciencia da computacao"
                        required
                        variant={errors.curso ? 'error' : 'default'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        id="instagram"
                        placeholder="https://instagram.com/nome"
                        required
                        variant={errors.instagram ? 'error' : 'default'}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imagem"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Foto</FormLabel>
                    <FormControl>
                      <Input
                        accept="image/*"
                        id="file"
                        type="file"
                        variant={errors.imagem ? 'error' : 'default'}
                        {...field}
                        onChange={(e) => {
                          setSelectedFile(e.target.files![0])
                          field.onChange(e)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={disableSubmitBtn}
                loading={isLoading}
              >
                Salvar
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default AdicionarMorador
