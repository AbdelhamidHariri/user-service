import client, { Channel } from "amqplib";

export const rabbitMQ = async () => {
  let connection;
  let channel: Channel;
  let connected: Boolean = false;

  const connect = async () => {
    if (connected) return;
    connected = true;

    try {
      connection = await client.connect(process.env.RABBITMQ_URL!);
      channel = await connection.createChannel();
    } catch (error) {
      console.log(error);
    }
  };

  const publish = async (queue: string, message: any) => {
    try {
      if (!channel) await connect();
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      console.log(error);
    }
  };

  const consume = async (queue: string, handler: any) => {
    try {
      if (!connected) await connect();
      await channel.assertQueue(queue, {
        durable: true,
      });

      channel.consume(
        queue,
        (msg) => {
          {
            if (!msg) {
              return console.log("Invalid incoming message");
            }
            handler(msg?.content?.toString());
            channel.ack(msg);
          }
        },
        { noAck: false }
      );
    } catch (error) {}
  };

  return {
    publish,
    consume,
  };
};
