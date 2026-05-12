import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
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
    const products = readProduct();
    // console.log("body", body)
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    // console.log(newProduct)
    products.push(newProduct);
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Created Successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: Iproduct) => p.id === id);
    console.log("INDEX", index);
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found",
          data: null,
        }),
      );
    }
    console.log("OLD", products[index]);
    products[index] = { id: products[index].id, ...body };
    insertProduct(products);
    console.log("NEW", products[index]);
    res.writeHead(404, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Updated Successfully",
        data: products[index],
      }),
    );
  }
};
