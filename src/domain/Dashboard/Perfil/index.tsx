import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TrocarSenha from "../SharedComponents/TrocarSenha";

interface Perfil {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  }
}

export default function Perfil({ user }: Perfil) {
  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>{user.name} | {user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-40 h-40 mx-auto rounded-md mb-4">
          <Image src={user.image!} alt={user.name!} className="rounded-md" width={160} height={160} />
        </div>
        <TrocarSenha name={user.name!} />
      </CardContent>
    </Card>
  );
}
