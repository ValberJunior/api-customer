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

const APP_PORT = process.env.PORT || "4000";
const APP_HOST = process.env.HOST || "localhost"

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

app.listen({ host: APP_HOST, port: parseInt(APP_PORT, 10) }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
