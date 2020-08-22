interface IOptions {
  client_id?: string;
  client_secret?: string;
  access_token?: string;
  sandbox?: boolean;
  show_promise_error?: boolean;
}
declare module 'mercadopago' {
  export function configure(options: IOptions): void;
  export function getAuthorizedPayment(): any;
  export const payment;
}
