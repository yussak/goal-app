FROM golang:1.20.5

RUN apt-get update && \
    apt-get install -y \
        git \
        build-essential

# goファイルでimportして使用するものはimportに追加してgo mod tidyでいいが、それ以外のものはDockerfileでインストールする
RUN go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
RUN go install github.com/cosmtrek/air@latest

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]