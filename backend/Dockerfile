FROM golang:1.20.5

RUN apt-get update && \
    apt-get install -y \
        git \
        build-essential

WORKDIR /app

COPY go.mod go.sum ./

# TODO:install get統一したい
# 「事前にビルドされたバイナリをダウンロードして使用」したい

# TODO:ここでgo getする意味ない気がする。importを書いた上でgo mod tidyして初めてインストールされる（ここで書いてもインストールされない）気がする
RUN go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
RUN go get github.com/oklog/ulid/v2
RUN go get github.com/go-sql-driver/mysql
# TODO:godotenv使わなくなった気がするので消すか確認
RUN go get github.com/joho/godotenv
RUN go get github.com/gin-gonic/gin
RUN go install github.com/cosmtrek/air@latest

RUN go mod download

COPY . .

EXPOSE 8080

# CMD ["go","run","main.go"]
CMD ["air", "-c", ".air.toml"]