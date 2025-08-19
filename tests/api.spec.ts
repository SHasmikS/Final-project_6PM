import { test, expect } from '@playwright/test';



test.describe("Cart API checks", () => {
  test("GET getCartItemsCount returns count", async ({ request }) => {
    const response = await request.get("https://amazon.6pm.com/mobileapi/v1/getCartItemsCount");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("count");
    expect(typeof body.count).toBe("number");
  });


   test("cart count should be a non-negative integer", async ({ request }) => {
    const response = await request.get("https://amazon.6pm.com/mobileapi/v1/getCartItemsCount");

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Object.keys(body)).toContain("count");
    expect(Number.isInteger(body.count)).toBeTruthy();
    expect(body.count).toBeGreaterThanOrEqual(0);
  });

  
  test("Cart items quantity are non-negative integers", async ({ request }) => {
    const endpoint = "https://amazon.6pm.com/mobileapi/v1/cart";
    const response = await request.get(endpoint);
    const body = await response.json();

    expect(Array.isArray(body.items)).toBeTruthy();

    for (const item of body.items) {
      expect(Number.isInteger(item.quantity)).toBeTruthy();
      expect(item.quantity).toBeGreaterThanOrEqual(0);
    }
  });
});

 