const express = require('express');
const { Kafka } = require('kafkajs');
const uuid = require('uuid');

const app = express();
const port = 3000;

const kafka = new Kafka({
  clientId: 'productor',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

app.get('/generarToken', async (req, res) => {
  const token = uuid.v4();

  await producer.connect();
  await producer.send({
    topic: 'tokens',
    messages: [{ value: token }],
  });
  await producer.disconnect();

  console.log('Token enviado a Kafka:', token);
  res.json({ token });
});

app.listen(port, () => {
  console.log(`Microservicio de productor escuchando en http://localhost:${port}`);
});
