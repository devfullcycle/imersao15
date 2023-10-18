![Imersão Full Stack && Full Cycle](https://events-fullcycle.s3.amazonaws.com/events-fullcycle/static/site/img/grupo_4417.png)

Participe gratuitamente: https://imersao.fullcycle.com.br/

## Sobre o repositório
Esse repositório contém todo código utilizado durante as aulas para referência.

Faça seu fork e também nos dê uma estrelinha para nos ajudar a divulgar o projeto.

---

### Alterações no `Dockerfile - Go`:

Durante a aula 01 o Wesley configura o `Dockerfile` com a instalação do `cobra` que vamos utilizar mais a frente no curso, mas há uma alteração a ser feita na instalação desta ferramenta como abaixo:

Precisamos substituir por este comando: `go get github.com/spf13/cobra@v1.7.0 && \` e incluir o comando de instalação do `cobra-cli`: `go get github.com/spf13/cobra-cli@v1.3.0 && \`

Após realizar as alterações acima o `Dockerfile` ficará da seguinte forma:

```docker
FROM golang:1.15

WORKDIR /go/src
ENV PATH="/go/bin:${PATH}"
ENV GO111MODULE=on
ENV CGO_ENABLED=1

RUN apt-get update && \
    apt-get install build-essential protobuf-compiler librdkafka-dev -y && \
    go get google.golang.org/grpc/cmd/protoc-gen-go-grpc && \
    go get google.golang.org/protobuf/cmd/protoc-gen-go && \
    go get github.com/spf13/cobra@v1.7.0 && \
    go get github.com/spf13/cobra-cli@v1.3.0 && \
    wget https://github.com/ktr0731/evans/releases/download/0.9.1/evans_linux_amd64.tar.gz && \
    tar -xzvf evans_linux_amd64.tar.gz && \
    mv evans ../bin && rm -f evans_linux_amd64.tar.gz

CMD ["tail", "-f", "/dev/null"]
```

---

### Alteração de comando - Aula 02 - Imersão - gRPC e o abismo entre devs e empresas

Como explicado acima, precisamos incluir o `cobra-cli` nas instalações internas do `container`, por isso o comando para iniciar o `cobra` será: `cobra-cli init`

---

### Possíveis erros:

Caso você esteja recebendo o erro abaixo:

`../pkg/mod/golang.org/x/net@v0.12.0/http2/transport.go:19:2: package io/fs is not in GOROOT (/usr/local/go/src/io/fs)`

Apague o arquivo `go.sum` então dentro do arquivo `go.mod` copie e substitua os seguintes pacotes abaixo:

```go
require (
    github.com/asaskevich/govalidator v0.0.0-20200907205600-7a23bdc65eef
    github.com/confluentinc/confluent-kafka-go v1.5.2
    github.com/go-playground/validator/v10 v10.4.1
    github.com/golang/protobuf v1.4.3
    github.com/jinzhu/gorm v1.9.16
    github.com/joho/godotenv v1.3.0
    github.com/lib/pq v1.9.0
    github.com/mitchellh/go-homedir v1.1.0
    github.com/satori/go.uuid v1.2.0
    github.com/spf13/cobra v1.1.1
    github.com/spf13/viper v1.7.1
    github.com/stretchr/testify v1.7.0
    google.golang.org/grpc v1.35.0
    google.golang.org/protobuf v1.25.0
    gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c // indirect
    gorm.io/driver/sqlite v1.1.4
    gorm.io/gorm v1.20.12
)
```

No terminal rode os comando abaixo:

`go mod init`

Com isso a aplicação deve funcionar corretamente.