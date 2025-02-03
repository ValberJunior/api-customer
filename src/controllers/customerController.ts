import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCustomerParams, CustomerById } from "./types";
import { CustomerApi } from "../api/customerApi";
import { Customer } from "../utils/@types";

export class CustomerController {

  private customerApi : CustomerApi;

  constructor(){
    this.customerApi = new CustomerApi();
  }
    createCustomer= async (request: FastifyRequest, reply: FastifyReply) => {
      const { name, email } = request.body as CreateCustomerParams;

      if(!name || !email) reply.status(400).send("*Name and Email are required")

      try{
        const customer = await this.customerApi.create(name, email);
        reply.send({
          message: 'Customer created!',
          customer
        })
      }
      catch(error){
        reply.status(500).send(`Error in request : ${error}`)
      }
    }

    listCustomers = async (request: FastifyRequest, reply: FastifyReply) => {
      try{
        const customers = await this.customerApi.listAllCustomers();
        reply.send({
          customers
        })
      }
      catch(error){
        reply.status(500).send(`Error in request : ${error}`)
      }
    }

    getCustomerById = async (request:FastifyRequest, reply: FastifyReply) => {   
      const { customerId } = request.params as CustomerById;

      if(!customerId) reply.status(400).send("*CustomerId is Required")

      try{
        const customer = await this.customerApi.getCustomerById(customerId);
        reply.send({
          customer
        })
      }
      catch(error){
        reply.status(500).send(`Error to delete customer: ${error}`)
      }
    }

    deleteCustomer = async (request:FastifyRequest, reply: FastifyReply) => {
      const { customerId } = request.params as CustomerById;

      if(!customerId) reply.status(400).send("*CustomerId is Required")

      try{
        const response = await this.customerApi.deleteCustomer(customerId);
        reply.send({
          message: response.message
        })
      }
      catch(error){
        reply.status(500).send(`Error to delete customer: ${error}`)
      }
    }

    updateCustomer = async (request:FastifyRequest, reply: FastifyReply) => {
      const customer = request.body as Partial<Customer>;

      if(!customer.id) reply.status(400).send("*CustomerId is Required")

      try{
        const response = await this.customerApi.updateCustomer(customer);
        reply.send(response)
      }
      catch(error){
        reply.status(500).send(`Error to update customer: ${error}`)
      }
    }
}