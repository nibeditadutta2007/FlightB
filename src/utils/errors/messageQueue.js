import amqplib from "amqplib";
import {
    EXCHANGE_NAME,
    MESSAGE_BROKER_URL
} from "../../config/envConfig.js";

export const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(
            EXCHANGE_NAME,
            "direct",
            {
                durable: true
            }
        );
        return channel;
    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        throw error;
    }
};
export const publishMessage = async (
    channel,
    bindingKey,
    message
) => {
    try {
        await channel.assertQueue("REMAINDER_QUEUE", {
            durable: true
        });
        channel.bindQueue(
            "REMAINDER_QUEUE",
            EXCHANGE_NAME,
            bindingKey
        );
        channel.publish(
            EXCHANGE_NAME,
            bindingKey,
            Buffer.from(message),
            {
                persistent: true
            }
        );
        console.log("Message published successfully");
    } catch (error) {
        console.error("Failed to publish message:", error);
        throw error;
    }
};
export const subscribeMessage = async (
    channel,
    bindingKey
) => {
    try {
        const queue = await channel.assertQueue(
            "REMAINDER_QUEUE",
            {
                durable: true
            }
        );
        await channel.bindQueue(
            queue.queue,
            EXCHANGE_NAME,
            bindingKey
        );
        await channel.consume(queue.queue, (message) => {
            if (!message) return;
            console.log("Received message:");
            console.log(message.content.toString());

            channel.ack(message);
        });
        console.log("Waiting for messages...");
    } catch (error) {
        console.error("Failed to subscribe to queue:", error);
        throw error;
    }
};