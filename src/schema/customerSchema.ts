import { z } from 'zod';


export const CustomerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  status: z.boolean().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
});

export const CustomersListResponse = z.array(CustomerSchema); 

export const CreateCustomerRequest = z.object({
  name: z.string(),
  email: z.string().email()
});

export const UpdateCustomerRequest = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  status: z.boolean().optional()
});

export const GetCustomerByIdRequest = z.object({
  customerId: z.string()
});

export const DeleteCustomerResponse = z.object({
    message: z.string()
})

export const ErrorResponse = z.object({
  message: z.string()
});
