import type { IncomingMessage, ServerResponse } from "http";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const products = [
    {
      id: 1,
      name: "Laptop",
      price: 850,
      quantity: 5,
    },
    {
      id: 2,
      name: "Mouse",
      price: 25,
      quantity: 20,
    },
    {
      id: 3,
      name: "Keyboard",
      price: 45,
      quantity: 15,
    },
    {
      id: 4,
      name: "Monitor",
      price: 200,
      quantity: 8,
    },
    {
      id: 5,
      name: "Headphone",
      price: 60,
      quantity: 12,
    },
  ];

  res.writeHead(200, { "content-type": "application/json" });
  res.end(
    JSON.stringify({ message: "This is Products route", data: products }),
  );
};
