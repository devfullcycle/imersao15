# Imersão Full Stack & FullCycle - CodePix

## Descrição

Repositório do front-end feito com Next.js (Front-end dos bancos)

**Importante**: A aplicação do Apache Kafka, Golang e Nest.js deve estar rodando primeiro.

## Configurar /etc/hosts

A comunicação entre as aplicações se dá de forma direta através da rede da máquina.
Para isto é necessário configurar um endereços que todos os containers Docker consigam acessar.

Acrescente no seu /etc/hosts (para Windows o caminho é C:\Windows\system32\drivers\etc\hosts):
```
127.0.0.1 host.docker.internal
```
Em todos os sistemas operacionais é necessário abrir o programa para editar o *hosts* como Administrator da máquina ou root.

## Rodar a aplicação

Execute os comandos:

```
docker compose up

## Rodar banco BBX (dentro do container app)
npm run 001:dev

## Rodar banco CTER (dentro do container app)
npm run 002:dev
```

Acessar http://localhost:8000 para o `BBX` e http://localhost:8001 para o `CTER` para ver as contas bancárias e poder fazer as operações.

### Para Windows 

Lembrar de instalar o WSL2 e Docker. Vejo o vídeo: [https://www.youtube.com/watch?v=btCf40ax0WU](https://www.youtube.com/watch?v=btCf40ax0WU) 

Siga o guia rápido de instalação: [https://github.com/codeedu/wsl2-docker-quickstart](https://github.com/codeedu/wsl2-docker-quickstart) 
