FROM golang:1.20.5-alpine

WORKDIR /app

COPY go.mod ./

RUN go mod download

EXPOSE 8080

CMD ["go","run","main.go"]