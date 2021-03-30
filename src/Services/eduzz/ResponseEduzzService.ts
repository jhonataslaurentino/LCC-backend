interface Request {
  customer_email: string;
  customer_name: string;
  product_name: string;
  product_code: number;
}

class ResponseEduzzService {
  public async execute({
    customer_email,
    customer_name,
    product_name,
    product_code,
  }: Request): Promise<void> {
    console.log(customer_email);
    console.log(customer_name);
    console.log(product_name);
    console.log(product_code);
  }
}
