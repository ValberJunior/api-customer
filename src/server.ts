import Fastify from 'fastify';
import cors from '@fastify/cors';
import { routes } from './services/routes';
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import formBody from '@fastify/formbody';

const app = Fastify({ logger: true });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(swagger, {
  openapi: {
    info: {
      title: "Customer API",
      description: "Customer Manager API",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});

app.register(swaggerUI, { routePrefix: "/docs" });
app.register(formBody);
app.register(cors);
app.register(routes);

// Exportação para Vercel Serverless
export default async (req: any, res: any) => {
  await app.ready();
  app.server.emit('request', req, res);
};
