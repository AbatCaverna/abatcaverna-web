import Stripe from 'stripe';

export type Price = Stripe.Response<Stripe.Price>;

export type Product = Stripe.Response<Stripe.Product>;

export type ProductResponse = {
  product: Product;
  price: Price;
};

export type ProductsResponse = ProductResponse[];