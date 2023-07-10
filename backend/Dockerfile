FROM golang:1.20.5

RUN apt-get update && \
    apt-get install -y \
        git \
        build-essential

RUN go install github.com/cosmtrek/air@latest

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]