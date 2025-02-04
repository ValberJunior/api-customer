import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { CustomerController } from "../controllers/customerController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions)
{
   const customerController = new CustomerController();
   
  /**
   * @swagger
   * /health-check:
   *   get:
   *     summary: API Health Check
   *     description: Returns the API status to indicate if it is operational.
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: API is operational
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                   type: string
   *                   example: "🟢 ok"
   *                 timestamp:
   *                   type: string
   *                   format: date-time
   *                   example: "2024-02-03T12:34:56.789Z"
   */
  fastify.get("/health-check", async (request: FastifyRequest, reply: FastifyReply) => {
    return {
      status: "🟢 ok",
      timestamp: new Date().toISOString()
    };
  });

  /**
   * @swagger
   * /customers:
   *   post:
   *     summary: Create a new customer
   *     description: Registers a new customer in the system.
   *     tags: [Customers]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [name, email]
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       201:
   *         description: Customer successfully created
   *       400:
   *         description: Name and email are required
   */
  fastify.post("/customers", customerController.createCustomer);

  /**
   * @swagger
   * /customers:
   *   get:
   *     summary: Retrieve all customers
   *     description: Returns a list of all registered customers.
   *     tags: [Customers]
   *     responses:
   *       200:
   *         description: Customers retrieved successfully
   */
  fastify.get("/customers", customerController.listCustomers);

  /**
   * @swagger
   * /customers/{customerId}:
   *   get:
   *     summary: Get customer by ID
   *     description: Retrieves a customer using their unique ID.
   *     tags: [Customers]
   *     parameters:
   *       - name: customerId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Customer found
   *       404:
   *         description: Customer not found
   */
  fastify.get("/customers/:customerId", customerController.getCustomerById);

  /**
   * @swagger
   * /customers/{customerId}:
   *   delete:
   *     summary: Delete a customer
   *     description: Removes a customer from the system using their ID.
   *     tags: [Customers]
   *     parameters:
   *       - name: customerId
   *         in: path
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Customer deleted successfully
   *       404:
   *         description: Customer not found
   */
  fastify.delete("/customers/:customerId", customerController.deleteCustomer);

  /**
   * @swagger
   * /customers:
   *   patch:
   *     summary: Update a customer
   *     description: Updates an existing customer's information.
   *     tags: [Customers]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [id]
   *             properties:
   *               id:
   *                 type: string
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Customer updated successfully
   *       400:
   *         description: Customer ID is required
   */
  fastify.patch("/customers", customerController.updateCustomer);
}