export interface CreateCheckOutSession {
  currency?: string;
  product?: {
    name: string;
    price: number;
    images: string[];
    description: string;
  };
  user: {
    id: string;
    email: string;
    name: string;
  };
  quantity: number;
  success_url: string;
  cancel_url: string;
}

export interface UpdateCustomer {
  name: string;
  email: string;
}

export interface StripeRepository {
  createCheckOutSession(data: CreateCheckOutSession): Promise<string | null>;
  updateCostumer(id: string, data: Partial<UpdateCustomer>): Promise<void>;
}
