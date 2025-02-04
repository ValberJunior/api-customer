import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './services/routes';
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const APP_PORT = process.env.APP_PORT || 3333;
const APP_HOST = process.env.APP_HOST || "http://localhost"

const app = Fastify({logger:true});

app.register(swagger, {
    openapi: {
      info: {
        title: "Customer API",
        description: "API para gerenciamento de clientes",
        version: "1.0.0"
      },
      servers: [{ url: `${APP_HOST}:${APP_PORT}` }]
    }
  });
  
  app.register(swaggerUI, {
    routePrefix: "/docs"
  });

const start = async () => {

    await app.register(cors);
    await app.register(routes);

    try{
        await app.listen({port: APP_PORT as number})
    }
    catch(error){
        process.exit(1)
    }
}

start();