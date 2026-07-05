import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let client = null;

export function connect(callback) {

    client = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/workflow-ws"),
        reconnectDelay: 5000,

        onConnect: () => {

            console.log("WebSocket Connected");

            client.subscribe("/topic/events", message => {

                callback(JSON.parse(message.body));

            });

        },

        onStompError: frame => {

            console.error(frame);

        }

    });

    client.activate();
}