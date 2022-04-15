/**
 * Trasnforma unidade em centavos para uma string em reais el
 * 
 * @param amount = a quantidade em centavos para ser transformada
 *
 */
export default function trasnformUnitAmount(amount: number | null) {
  if (!amount) return "R$0,00";

  const realAmount = amount / 100;
  const stringAmount = realAmount.toLocaleString('pt-BR', {
    style: "currency",
    currency: "BRL"
  })

  return stringAmount
}