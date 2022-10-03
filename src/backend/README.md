# BACKEND

Para facilitar a munutenabilidade do código, e o uso das funcionalidades do backend foi adcionado ao projeto o padrão Controller-Service-Repository. Assim, o código do backend fica com suas responsábilidades bem estabelecidas e temos uma experiência com o desenvolvimento melhorado.

## Controller-Service-Repository

Esse padrão é uma extensão do padrão MVC, que extende o padrão para ter duas novas camadas "Service" e "Repository". Assim temos uma maior separação de responsábilidades: o Controller fica responsável por expor a cadamada de lógica para a aplicação. A camada de serviço é onde fica a lógica do negócio, e por fim a camada de Repository fica responsável por armazenar e pegar os dados do banco de dados.
