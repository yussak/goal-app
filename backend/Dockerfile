FROM golang:1.20.5

RUN apt-get update && \
    apt-get install -y \
        git \
        build-essential

WORKDIR /app

COPY go.mod ./

# TODO:install get統一したい
# 「事前にビルドされたバイナリをダウンロードして使用」したい
RUN go install -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
RUN go get github.com/oklog/ulid/v2
RUN go get github.com/go-sql-driver/mysql

RUN go mod download

COPY . .

EXPOSE 8080

CMD ["go","run","main.go"]