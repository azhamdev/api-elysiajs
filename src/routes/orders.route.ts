import { Elysia } from "elysia"

export const ordersRouter = new Elysia({ prefix: "/orders" })
  .get("/", () => {
    return {
      message: "You are getting all orders",
    }
  })
  .get("/:orderId", ({ params }) => {
    const orderId = params.orderId
    return {
      message: `you are getting order by ${orderId}`,
    }
  })
