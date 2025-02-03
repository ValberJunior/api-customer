import { Customer } from "../utils/@types"

export interface ICustomerApi {
    create(name: string, email: string): Promise<Customer>;
    listAllCustomers(): Promise<Customer[]>
    getCustomerById(customerId: string): Promise<Customer>;
    deleteCustomer(customerId: string): Promise<DefaultResponse>;
    updateCustomer(customer: Partial<Customer>): Promise<UpdateCustomerResponse>
}

export type DefaultResponse = {
    ok: boolean,
    message: string
}

export type UpdateCustomerResponse = {
    ok: boolean;
    message: string;
    customer: Customer
}