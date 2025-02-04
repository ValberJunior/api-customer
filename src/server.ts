import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './services/routes';
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const APP_PORT = process.env.APP_PORT || "3333";
const APP_HOST = process.env.APP_HOST || "localhost"

const app = Fastify({logger:true});

app.register(swagger, {
    openapi: {
      info: {
        title: "Customer API",
        description: "Customer Manager API",
        version: "1.0.0"
      },
      servers: [{ url: `${APP_HOST}:${APP_PORT}` }]
    }
  });
  
  app.register(swaggerUI, {
    routePrefix: "/docs"
  });

// const start = async () => {

  app.register(cors);
  app.register(routes);

//     try{
//         await app.listen({port: APP_PORT as number, host: APP_HOST})
//     }
//     catch(error){
//         process.exit(1)
//     }
// }

app.listen({ host: APP_HOST, port: parseInt(APP_PORT, 10) }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

// start();