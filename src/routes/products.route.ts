import { Elysia, t } from "elysia"

export const productsRouter = new Elysia({ prefix: "/products" })
  .get("/", ({ cookie: { sessionId }, query }) => {
    sessionId.set({
      value: "mySessionId",
      httpOnly: true,
    })

    const { category, minP, maxP } = query

    // logic if category = ... -> get data by category
    // ...

    // logic if minP || && maxP -> get data by price

    return {
      message: "You are getting all products",
    }
  })

  .post(
    "/",
    ({ body, headers, set }) => {
      console.log(headers)
      set.status = 201;
      return {
        message: "You are creating a product",
        body,
      }
    },
    // validation schema guard
    {
      body: t.Object({
        name: t.String(),
        price: t.Number(),
        authorEmail: t.String({ format: "email" }),
      }),
    }
  )

  .get("/:productId", ({ params }) => {
    const productId = params.productId
    return {
      message: `you are getting product by ${productId}`,
    }
  })
