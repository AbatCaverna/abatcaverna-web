import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import MoradoresService from 'services/MoradoresService'
import useAlert from 'hooks/useAlert'
import MoradorForm from './MoradorForm';

function AdicionarMorador() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { setAlert } = useAlert()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(handleCreateMorador, {
    onSuccess: (res) => {
      queryClient.setQueryData('moradores', (old: any) => [...old, res])
      setDialogOpen(false)
    }
  })

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

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar morador</Button>
      </DialogTrigger>
      <DialogContent className="bg-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar morador</DialogTitle>
          <DialogDescription>
            Use esse espaço para adicionar um novo morador ao site.
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto max-w-sm space-y-4">
          <MoradorForm isLoading={isLoading} onSuccess={mutate} />
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default AdicionarMorador
