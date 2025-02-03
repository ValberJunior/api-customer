import prismaClient from "../db/prisma";
import { Customer } from "../utils/@types";
import { ICustomerApi } from "./types";

export class CustomerApi implements ICustomerApi {

    async create(name: string, email: string) {
        return await prismaClient.customer.create({
            data: {
                name,
                email,
                status: true
            }
        });
    }

    async listAllCustomers() {
        return await prismaClient.customer.findMany();
    }

    private async findCustomer(id: string) {
        return await prismaClient.customer.findFirst({
            where: { id }
        });
    }

    async getCustomerById(customerId: string) {
        const customer = await this.findCustomer(customerId);
        if (!customer) {
            throw new Error("Customer not found");
        }
        return customer;
    }

    async deleteCustomer(customerId: string) {
        const customerExists = await this.findCustomer(customerId);
        if (!customerExists) {
            throw new Error("Customer not found");
        }
        await prismaClient.customer.delete({ where: { id: customerId } });

        return { ok: true, message: "Customer deleted!" };
    }

    async updateCustomer(customer: Partial<Customer>) {
        if (!customer.id) {
            throw new Error("Customer ID is required");
        }

        const customerExists = await this.findCustomer(customer.id);
        if (!customerExists) {
            throw new Error("Customer not found");
        }

        const { id, ...rest } = customer;
        const customerUpdated = await prismaClient.customer.update({
            where: { id },
            data: { ...rest, updated_at: new Date() }
        });

        return { ok: true, message: "Customer updated!", customer: customerUpdated };
    }
}
