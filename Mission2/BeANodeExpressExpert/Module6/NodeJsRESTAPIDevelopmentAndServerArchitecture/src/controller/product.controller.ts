import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

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
    if (!product) {
      sendResponse(res, 404, false, "Product Not Found", product);
    }
    sendResponse(res, 200, true, "Product Retrived Successfully", product);
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
    sendResponse(res, 200, true, "Product Created Successfully", newProduct);
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: Iproduct) => p.id === id);
    console.log("INDEX", index);
    if (index < 0) {
      sendResponse(res, 404, false, "Product Not Found", null);
    }
    console.log("OLD", products[index]);
    products[index] = { id: products[index].id, ...body };
    insertProduct(products);
    console.log("NEW", products[index]);
    sendResponse(
      res,
      404,
      true,
      "Product Updated Successfully",
      products[index],
    );
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((p: Iproduct) => p.id === id);
    const deletedProduct = products[index];
    if (index < 0) {
      sendResponse(res, 404, false, "Product Not Found", null);
    }
    products.splice(index, 1);
    console.log(products);
    insertProduct(products);
    sendResponse(res, 200, true, "Product deleted Succesfully", deletedProduct);
  }
};
