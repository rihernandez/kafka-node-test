const express = require('express');
const { Kafka } = require('kafkajs');

const app = express();
const port = 3001;

const kafka = new Kafka({
  clientId: 'consumidor',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'mostrador' });

app.get('/mostrarToken', (req, res) => {
  res.send(`Último token recibido: ${lastToken || 'Ninguno'}`);
});

let lastToken;

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'tokens', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      lastToken = message.value.toString();
      console.log('Token recibido de Kafka:', lastToken);
    },
  });
};

runConsumer().then(() => {
  app.listen(port, () => {
    console.log(`Microservicio de consumidor escuchando en http://localhost:${port}`);
  });
});
