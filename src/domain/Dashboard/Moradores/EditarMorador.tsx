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
import MoradorForm, { Morador } from './MoradorForm';

interface Props {
  morador: Morador
}

function EditarMorador({ morador }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { setAlert } = useAlert()
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(handleupdate, {
    onSuccess: (res) => {
      queryClient.setQueryData('moradores', (old: any) => {
        const newArr = old.filter((o: Morador) => o._id !== res?._id)
        return [...newArr, res]
      })
      setDialogOpen(false)
    }
  })

  async function handleupdate(formData: FormData) {
    try {
      const response = await MoradoresService.updateMorador(formData)
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
        <Button variant="outline">Editar</Button>
      </DialogTrigger>
      <DialogContent className="bg-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar morador</DialogTitle>
          <DialogDescription>
            Você está editando: {morador.apelido}
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto max-w-sm space-y-4">
          <MoradorForm initialValues={morador} isLoading={isLoading} onSuccess={mutate} />
        </div>
      </DialogContent>
    </Dialog >
  )
}

export default EditarMorador
