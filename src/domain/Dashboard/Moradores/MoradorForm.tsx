'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import YearInput from '@/components/ui/year-select'

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

export type Morador = z.infer<typeof MoradorSchema>;

interface Props {
  onSuccess: (formData: FormData) => void
  initialValues?: Morador
  isLoading?: boolean
}

function MoradorForm({ onSuccess, isLoading = false, initialValues }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const form = useForm<Morador>({
    resolver: zodResolver(MoradorSchema),
    values: {
      apelido: initialValues?.apelido || '',
      nome: initialValues?.nome || '',
      ano_entrada: initialValues?.ano_entrada || 2014,
      curso: initialValues?.curso || '',
      imagem: initialValues?.imagem || '',
      instagram: initialValues?.instagram || '',
    },
  })
  const { errors } = form.formState
  console.log({ initialValues })

  function onSubmit(values: Morador) {
    const formData = new FormData()

    Object.entries(values).forEach(([key, value]) => {
      if (key === 'imagem') {
        formData.set(key, selectedFile as File)
      } else {
        formData.set(key, value as any)
      }
    })

    onSuccess(formData)
  }

  const disableSubmitBtn = isLoading || Object.values(errors).length > 0
  return (
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
  )
}

export default MoradorForm
