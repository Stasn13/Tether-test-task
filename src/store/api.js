const socketInstance = {
  initSocket() {
    if (!this.socket) {
      const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
      this.socket = socket;
      return this.socket;
    }
    return this.socket;
  },
  deleteSocket() {
    if (this.socket) {
      delete this.socket;
    }
  },
};

export const sunscribeOrderBook = (precisionLVL, updateData) => {
  const socket = socketInstance.initSocket();
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        event: 'conf',
        flags: 536870912,
        prec: precisionLVL,
      }),
    );
    socket.send(
      JSON.stringify({
        event: 'subscribe',
        channel: 'book',
        symbol: 'tBTCUSD',
      }),
    );
  };
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    const { event, chanId } = data;

    if (event === 'subscribed') {
      updateData(chanId, null);
    }

    if (data.length > 0) {
      updateData(null, data);
    }
  };
};

// export const resubscribeOrderBook = () => {
//     socket.send(
//     JSON.stringify({
//       event: 'conf',
//       flags: 536870912,
//       prec: 'P3',
//     }),
//   );
//   socket.send(
//     JSON.stringify({
//       event: 'subscribe',
//       channel: 'book',
//       symbol: 'tBTCUSD',
//     }),
//   );
// };

// export const changePrecisionLvl = () => {
//   currentSocket.send(
//     JSON.stringify({
//       prec: 'P5',
//     }),
//   );
// };

export const unsubscribeOrderBook = (chanId) => {
  const socket = socketInstance.initSocket();
  socket.send(
    JSON.stringify({
      event: 'unsubscribe',
      chanId,
      symbol: 'tBTCUSD',
    }),
  );
  socket.close();
  socketInstance.deleteSocket();
};
