import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  if (url === "/products" && method === "GET") {
    const products = readProduct();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is Products route", data: products }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: Iproduct) => p.id === id);
    // console.log(product)
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Retrived Successfully",
        data: product,
      }),
    );
  } else if (method === "POST" && id !== null) {
    const body = await parseBody(req);
    console.log("body", body)
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "Product Created Successfully", data: {} }),
    );
  }
};
