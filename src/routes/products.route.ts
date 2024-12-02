import { Elysia } from "elysia"

export const productsRouter = new Elysia({ prefix: "/products" })
  .get("/", () => {
    return {
      message: "You are getting all products",
    }
  })
  .get("/:productId", ({ params }) => {
    const productId = params.productId
    return {
      message: `you are getting product by ${productId}`,
    }
  })
