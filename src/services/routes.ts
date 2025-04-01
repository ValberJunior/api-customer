import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { CustomerController } from "../controllers/customerController";
import { HealthCheckResponse } from "../schema/healthSchema";
import { CreateCustomerRequest, CustomerSchema, CustomersListResponse, DeleteCustomerResponse, ErrorResponse, GetCustomerByIdRequest, UpdateCustomerRequest } from "../schema/customerSchema";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions)
{
   const customerController = new CustomerController();
   
  /**
   * health check
   */
  fastify.get("/health", {
    schema: {
      response: {
        200: HealthCheckResponse,
      },
    },
  },
  async (request: FastifyRequest, reply: FastifyReply) => {
    return {
      status: "🟢 ok",
      timestamp: new Date().toISOString()
    };
  });

  /**
   *  Create a new Customer
   */
  fastify.post("/customers",{
   schema:{
    body: CreateCustomerRequest,
    response:{
      201: CustomerSchema,
      400: ErrorResponse
    }
   }  
  },customerController.createCustomer);

  /**
   * Get Customers List
   */
  fastify.get("/customers", {
    schema:{
      response:{
        200: CustomersListResponse,
        500: ErrorResponse
      }
     }  
  },customerController.listCustomers);

  /**
   * Get Customer by ID
   */
  fastify.get("/customers/:customerId",{
    schema: {
      params: GetCustomerByIdRequest,
      response:{
        200: CustomerSchema,
        404: ErrorResponse
      }
    }
  }, customerController.getCustomerById);

  /**
   * Delete Customer
   */
  fastify.delete("/customers/:customerId", {
    schema: {
      params: GetCustomerByIdRequest,
      response:{
        200: DeleteCustomerResponse,
        404: ErrorResponse
      }
    }
  },customerController.deleteCustomer);

 /**
  * Update Customer
  */
  fastify.patch("/customers/:customerId", {
    schema: {
      params: GetCustomerByIdRequest,
      body: UpdateCustomerRequest,
      response: {
        200: CustomerSchema,
        400: ErrorResponse,
      },
    },
  },customerController.updateCustomer);
}