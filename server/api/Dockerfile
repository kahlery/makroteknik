# Stage 1: Build the Go binary
FROM golang:1.19-alpine AS builder

# Set the current working directory inside the container
WORKDIR /api

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go app
RUN go build -o cmd/center/main.go ./bin

# Stage 2: Run the Go binary on a minimal image
FROM alpine:latest

# Set the current working directory inside the container
WORKDIR /root/

# Copy the pre-built binary from the builder stage
COPY --from=builder /bin .

# Expose the necessary port
EXPOSE 8000

# Command to run Go binary
CMD ["./main"]