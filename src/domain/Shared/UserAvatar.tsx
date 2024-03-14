import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

interface Props {
  image: string
  name: string
}

function UserAvatar({ image, name }: Props) {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback className="bg-light-gray text-yellow">{name.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
