const Hapi = require('@hapi/hapi');
const adminroute = require('./routes/admin');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(adminroute);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();