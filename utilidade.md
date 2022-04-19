# troubleshoting

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