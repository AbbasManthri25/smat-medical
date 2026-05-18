export interface OrderItem {
  productId: string;
  name:      string;
  price:     number;
  quantity:  number;
  image?:    string;
  category?: string;
}

export interface Order {
  _id:             string;
  orderId:         string;
  items:           OrderItem[];
  shippingAddress: string;
  city?:           string;
  state?:          string;
  pincode?:        string;
  totalAmount:     number;
  paymentMethod:   'cod' | 'online';
  paymentStatus:   'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus:     'placed' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  notes?:          string;
  statusHistory:   { status: string; note: string; updatedAt: string }[];
  createdAt:       string;
}

export interface CheckoutForm {
  name:            string;
  email:           string;
  phone:           string;
  organization:    string;
  shippingAddress: string;
  city:            string;
  state:           string;
  pincode:         string;
  paymentMethod:   'cod' | 'online';
  notes:           string;
}
