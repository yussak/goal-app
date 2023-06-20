FROM golang:1.20.5-alpine

WORKDIR /app

COPY go.mod ./

RUN go get -tags 'mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
RUN go get github.com/oklog/ulid/v2
RUN go get github.com/go-sql-driver/mysql

RUN go mod download

COPY . .

EXPOSE 8080

CMD ["go","run","main.go"]