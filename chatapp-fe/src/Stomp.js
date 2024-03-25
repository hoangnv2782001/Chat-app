import { Client,StompConfig, } from "@stomp/stompjs";

import { WEBSOCKET_URL } from "./config";

import * as SockJS from "sockjs-client";

/**
 * init socket connect
 */
let socket;

const connectSocket = (token, onConnect) => {
  socket = new Client({
    brokerURL: WEBSOCKET_URL,
    connectHeaders: {
      // Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    // heartbeatIncoming: 6000,
    // heartbeatOutgoing: 0,
  });

  
  

  if (typeof WebSocket !== "function") {
    // For SockJS you need to set a factory that creates a new SockJS instance
    // to be used for each (re)connect

    console.log("stocjs .................")
  socket.webSocketFactory = function () {
    // Note that the URL is different from the WebSocket URL
    return new SockJS("http://localhost:8000/ws", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  }

  socket.onConnect = onConnect;

  

  socket.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
  };

  socket.beforeConnect = () => {
    console.log("connecting!!!!!!!");
  };

  socket.debug = (message) => {
    console.log("debug", message);
  };

  socket.onWebSocketError = (message) => {
    console.log("websocket error :", message);
  };

  socket.onDisconnect = () => {
    console.log("Connection Terminated");
  };

  socket.onWebSocketClose = (closeEevent) => {
    console.log("Websocket Terminated!!");
    console.log(`Reason: ${closeEevent.reason}`);
    console.log(`Code: ${closeEevent.code}`);
  };

  console.log("Stompconfig ",StompConfig)



  socket.activate();

  console.log("createconnect websocket");
};

export { socket, connectSocket };
