import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// app.use("*", cors({ origin: "*" }));

app.get("/", async (c) => {
  const options = {
    transactionReference: `ROUTE_TZD_${(Math.random() + 1)
      .toString(36)
      .substring(9)}`.toUpperCase(),
    merchantCode: "ROUTEK0001",
    currencyCode: "KES",
    amount: 100,
    orderId: "5tyhfdr6tdds5", //get this value from the profile
    terminalType: "WEB",
    redirectUrl: "#",
    domain: "ISWKE",
    customerId: "john",
    customerFirstName: "John",
    customerSecondName: "Mbugua",
    customerEmail: "john@gmail.com",
    customerMobile: "0799005059",
    customerCity: "Nairobi",
    customerCountry: "KE",
    customerState: "NBI",
  };
  const res = await fetch(
    "https://gatewaybackend.quickteller.co.ke/ipg-backend/api/checkout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(options),
    }
  );
  console.log(res.url);

  return c.redirect(res.url, 301);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
