import LogRocket from "logrocket";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";

type ProfileButton = {
  name: string
  image: string
  email: string
  role?: string
}
export default function ProfileButton({ name, image, role = "usuario", email }: ProfileButton) {
  async function handleLogOut() {
    await signOut({ callbackUrl: '/' })
  }


  useEffect(() => {
    // This is an example script - don't forget to change it!
    if (process.env.NODE_ENV === 'production') {
      LogRocket.identify(email, {
        name,
        email,

        // Add your own custom user variables here, ie:
        subscriptionType: 'pro'
      });
    }

  }, [email, name])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-yellow font-bold flex gap-2 items-center px-2 py-1 rounded-lg">
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback className="bg-light-gray text-yellow">{name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <p>{name}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-yellow">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-light-gray" />
        <DropdownMenuItem>
          <Link href={role === "cavernoso" ? "/dashboard" : "/perfil"}>
            {role === "cavernoso" ? "Dashboard" : "Perfil"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button variant="link" className="text-light-gray p-0 hover:no-underline hover:text-yellow hover:brightness-90" onClick={handleLogOut}>Sair</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}
