# troubleshooting

## problemas rodando o programa

Caso esteja tentando rodar o programa com o comando ```yarn dev``` após utilizar o docker e esteja acusando um erro

```bash
[Error: EACCES: permission denied, unlink '$PATH/abatcaverna-web/.next/server/_error.js'] {
  errno: -13,
  code: 'EACCES',
  syscall: 'unlink',
  path: '$PATH/abatcaverna-web/.next/server/_error.js'
}
```

Você precisa apenas usar o comando abaixo para dar permissão para o projeto:

```bash
sudo chown -R $USER <project-dir>
```

# Stripe

Como utilizar a cli do stripe para testar os webhooks local

Após [instalar](https://stripe.com/docs/stripe-cli#install) o stripe cli você precisa apenas executar os comandos abaixo para começar a ouvir os canais

```bash
stripe login --api-key $SECRETE_STRIPE_KEY
stripe listen --forward-to localhost:3000/api/webhooks
```