# Kafka Microservices Example

This is a simple example of two microservices using Kafka for communication. One microservice generates a token and publishes it to a Kafka topic, and the other microservice consumes the token from the topic.

## Prerequisites

- Node.js and npm installed
- Kafka broker running on `localhost:9092`

## Setup

1. **Install Dependencies:**

    ```bash
    npm install
    ```

2. **Run Microservice 1 (Generar Token):**

    ```bash
    node productor.js
    ```

    This microservice exposes an endpoint to generate a token. It will publish the token to the Kafka topic "tokens."

3. **Run Microservice 2 (Mostrar Token):**

    ```bash
    node consumidor.js
    ```

    This microservice consumes tokens from the Kafka topic "tokens" and exposes an endpoint to display the last received token.

## Usage

1. Access the following URL to generate a token:

    ```
    http://localhost:3000/generarToken
    ```

    This will return a JSON response containing the generated token.

2. Access the following URL to view the last received token:

    ```
    http://localhost:3001/mostrarToken
    ```

    This will display the last token consumed by the microservice.

## Configuration

- Microservice 1 (Generar Token): `productor.js`
  - Kafka Broker: `localhost:9092`
  - Topic: `tokens`

- Microservice 2 (Mostrar Token): `consumidor.js`
  - Kafka Broker: `localhost:9092`
  - Topic: `tokens`

Adjust the Kafka broker address and other configurations in the code if needed.

## Notes

- Ensure that the Kafka broker is running before starting the microservices.
- These examples use the `kafkajs` library for Kafka interaction. Install additional dependencies if necessary.
- For a production environment, consider enhancing error handling, security, and logging.

Feel free to modify this README to better suit your project's details and requirements.
