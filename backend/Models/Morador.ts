import { ObjectId } from "mongodb";

export default class Morador {
  constructor(
    public nome: string,
    public apelido: string,
    public ano_entrada: number,
    public curso: string,
    public imagem: string,
    public instagram: string,
    public cachaca_para_tomar: number,
    public cachaca_ja_tomada: number,
    public _id?: ObjectId,
  ) {}
}