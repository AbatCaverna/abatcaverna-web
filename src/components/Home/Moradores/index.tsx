import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from 'next/link';

type Morador = {
  nome: string;
  apelido: string;
  dataEntrada: number;
  curso: string;
  image: string;
  base64: string;
  instagram?: string;
}

interface MoradorProps {
  moradores: Array<Morador>
}

export default function Moradores({ moradores }: MoradorProps) {

  return (
    <section id="moradores" className="prose max-w-screen-2xl overflow-x-auto">
      <h2 className="text-yellow">Moradores</h2>
      <ScrollArea className="flex justify-normal w-max px-4">
        <div className="flex justify-center md:justify-normal w-max">
          {moradores.map((morador) => (
            <div key={morador.nome} className="mx-5 text-white text-center">
              <Link href={morador.instagram || ''}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rounded-full border-yellow border-8 w-[185px] h-[185px]">
                    <Image
                      src={morador.image}
                      alt={morador.nome}
                      placeholder="blur"
                      blurDataURL={morador.base64}
                      width="185"
                      height="185"
                      className="rounded-full w-full"
                    />
                  </div>

                  <p className="text-yellow" title={`${morador.nome} - ${morador.curso}`}>
                    {morador.apelido} <br />
                    <span>{morador.dataEntrada}</span>
                  </p>

                </a>

              </Link>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
