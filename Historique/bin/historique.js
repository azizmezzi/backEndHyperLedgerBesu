/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable comma-dangle */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-use-before-define */
/**
 * Module dependencies.
 */

const debug = require('debug')('cashin:server');
const http = require('http');
// const https = require('https');
// const fs = require('fs');

const WebSocket = require('ws');
const mongoose = require('mongoose');
const app = require('../app');

mongoose.connect('mongodb://localhost/demo1');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('connected !');
});

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
/* var server =https.createServer({
  key: fs.readFileSync('../key2.pem'),
  cert: fs.readFileSync('../certificate2.pem')
}, app)
*/
/**
 * Listen on provided port, on all network interfaces.
 */
// const wsServer = new ws.Server({ noServer: true });
// wsServer.on("connection", (socket) => {
//   socket.on("message", (message) => console.log(message));
// });

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const Notifications = require('../models/Notifications');

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    console.log(JSON.parse(message));
    const data = JSON.parse(message);
    // const run = true;
    if (data.stop) {
      wss.clients.forEach((client) => {
        // console.log(client)
        if (ws === client) {
          client.close();
          ws.close();
        }
      });
    }
    let ll = 0;

    wss.clients.forEach(async (client) => {
      console.log('aa', ws === client);
      console.log('bb', ws.readyState === ws.OPEN);
      ll += 1;
      while (!data.stop && ws.readyState === ws.OPEN && ws === client) {
        await timeout(10000);
        console.log('run', data.borrower);

        // eslint-disable-next-line max-len
        await Notifications.find({ borrower: data.borrower, elimine: false }, (error, Notif) => {
          if (!error) {
            if (!data.stop) {
              ws.send(
                JSON.stringify({
                  borrower: data.borrower,
                  Notif,
                  stop: false,
                })
              );

              Notifications.updateMany(
                {
                  //  TypeNotification: { $in: ["Transfert", "talking"] },
                  borrower: data.borrower,
                  vu: false,
                },
                { vu: true },
                (err, notification) => {
                  if (err) {
                    console.error('error', err);
                  } else {
                    console.log(notification);
                  }
                }
              );
            } else {
              ws.send(
                JSON.stringify({
                  borrower: data.borrower,
                  Notif,
                  stop: true,
                })
              );
            }
          } else {
            console.error(error);
          }
        });
      }
      console.log(client.readyState, ws.readyState);
      console.log(client.CLOSED, ws.CLOSED);
      console.log(client.OPEN, ws.OPEN);
    });
    console.log(ll);

    console.log('received: %s', message);
  });

  // ws.on("close", function () {
  //   console.log("connection stop");
  //   wss.clients.forEach((client) => {
  //     if (ws === client) {
  //       client.close();
  //       console.log('close')
  //     }
  //   });

  //      connections.delete(connection);
  // });
  ws.send(JSON.stringify({ borrower: '', Notif: [] }));
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
