import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UserAvatar } from 'domain/Shared'
import useMoradoresQuery from 'query/moradoresQuery'
import React from 'react'
import AdicionarMorador from './AdicionarMorador'

function TabelaMoradores() {
  const { data, isFetching } = useMoradoresQuery()
  const moradores = data?.data.moradores

  return (
    <Table>
      <TableCaption>Moradores da AbatCaverna</TableCaption>
      <TableHeader >
        <TableRow>
          <TableHead className="w-[100px] text-gray-100">Foto</TableHead>
          <TableHead className="text-gray-100">Apelido</TableHead>
          <TableHead className="text-gray-100">Nome</TableHead>
          <TableHead className="text-gray-100">Ano de entrada</TableHead>
          <TableHead>
            <AdicionarMorador />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching && !moradores && (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        )}
        {moradores?.map((morador) => (
          <TableRow key={morador._id}>
            <TableCell>
              <UserAvatar image={morador.imagem} name={morador.apelido} />
            </TableCell>
            <TableCell>{morador.apelido}</TableCell>
            <TableCell>{morador.nome}</TableCell>
            <TableCell>{morador.ano_entrada}</TableCell>
            <TableCell className="px-auto">
              <Button type="button" variant="outline">Editar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-[40px] w-[40px] rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[125px] h-4 rounded-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[125px] h-4 rounded-full" />
      </TableCell>
    </TableRow>
  )
}
export default TabelaMoradores
