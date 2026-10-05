import { expect, request } from "@playwright/test";

export class APIUtils {
  constructor(
    private apiContext: any,
    private loginPayload: any,
  ) {}

  async getToken(): Promise<string> {
    //Login API
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      },
    );

    const responseBody = await loginResponse.json();
    const token = responseBody.token;
    return token;
  }

  async createOrder(orderPayload: any): Promise<{orderId: string, token: string}> {
    const token = await this.getToken()
    
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        data: orderPayload,
      },
    );
    const orderResponseJson = await orderResponse.json();
    console.log("Order Response:", orderResponseJson);
    const orderId = orderResponseJson.orders[0];
    const response = {
        orderId: orderId,
        token: token,
    }
    return response;
  }
}
