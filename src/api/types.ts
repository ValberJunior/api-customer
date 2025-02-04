import { Customer } from "../utils/@types";
import { 
  CustomerSchema, 
  CustomersListResponse, 
  DeleteCustomerResponse 
} from "../schema/customerSchema";

// Tipagens baseadas nos schemas do Zod
export type CustomerType = typeof CustomerSchema._type;
export type CustomersListType = typeof CustomersListResponse._type;
export type DeleteCustomerResponseType = typeof DeleteCustomerResponse._type;

export interface ICustomerApi {
  create(name: string, email: string): Promise<CustomerType>;
  listAllCustomers(): Promise<CustomersListType>;
  getCustomerById(customerId: string): Promise<CustomerType>;
  deleteCustomer(customerId: string): Promise<DeleteCustomerResponseType>;
  updateCustomer(customer: Partial<Customer>): Promise<CustomerType>;
}
