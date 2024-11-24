
export interface Order {
  id: number;
  totalAmount: number;
  orderDate: Date;
    status: string;
    orderItems: OrderItem[];
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}


