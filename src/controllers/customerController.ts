import { FastifyReply, FastifyRequest } from "fastify";
import { CustomerApi } from "../api/customerApi";
import { 
  CreateCustomerRequest, 
  UpdateCustomerRequest, 
  GetCustomerByIdRequest, 
  DeleteCustomerRequest 
} from "../schema/customerSchema";

export class CustomerController {
  private customerApi: CustomerApi;

  constructor() {
    this.customerApi = new CustomerApi();
  }

  createCustomer = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { name, email } = CreateCustomerRequest.parse(request.body);
      const customer = await this.customerApi.create(name, email);
      return reply.status(201).send(customer);
    } catch (error) {
      return reply.status(500).send({ message: `Error in request: ${error}` });
    }
  };

  listCustomers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const customers = await this.customerApi.listAllCustomers();
      return reply.send(customers);
    } catch (error) {
      return reply.status(500).send({ message: `Error in request: ${error}` });
    }
  };

  getCustomerById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { customerId } = GetCustomerByIdRequest.parse(request.params);
      const customer = await this.customerApi.getCustomerById(customerId);
      return reply.send(customer);
    } catch (error) {
      return reply.status(500).send({ message: `Error retrieving customer: ${error}` });
    }
  };

  deleteCustomer = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { customerId } = DeleteCustomerRequest.parse(request.params);
      const response = await this.customerApi.deleteCustomer(customerId);
      return reply.send(response);
    } catch (error) {
      return reply.status(500).send({ message: `Error deleting customer: ${error}` });
    }
  };

  updateCustomer = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const customer = UpdateCustomerRequest.parse(request.body);
      const response = await this.customerApi.updateCustomer(customer);
      return reply.send(response);
    } catch (error) {
      return reply.status(500).send({ message: `Error updating customer: ${error}` });
    }
  };
}
