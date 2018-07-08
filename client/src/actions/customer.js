export const CUSTOMERS_FETCH_ALL = "CUSTOMERS_FETCH_ALL";

export const getCustomers = customers => ({
  type: CUSTOMERS_FETCH_ALL,
  customers
});
