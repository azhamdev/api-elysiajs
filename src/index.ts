import { Elysia, t } from "elysia"
import { swagger } from "@elysiajs/swagger"
import { productsRouter } from "./routes/products.route"
import { ordersRouter } from "./routes/orders.route"

// chaining method
const app = new Elysia()
  .use(
    swagger({
      path: "/docs",
      scalarConfig: {
        defaultHttpClient: {
          targetKey: "javascript",
          clientKey: "fetch",
        },
      },
    })
  )

  .derive(({ headers }) => {
    if (headers.authorization === "myapitoken1") {
      return { username: "john" }
    }

    if (headers.authorization === "myapitoken2") {
      return { username: "doe" }
    }
  })
  // Global Hooks
  .guard((app) =>
    app // Global Hooks
      .onBeforeHandle(({ headers, set }) => {
        // validation
        // if !headers.authorization -> throw 401
        // if return something, and stop on this point

        const { authorization } = headers
        if (!authorization) {
          set.status = 401
          return {
            message: "Not authorized, and stop on this point",
          }
        }
      })

      .onAfterHandle(() => {
        console.log("After Handle Hook")
      })
      .get(
        "/",
        () => {
          console.log("Handler")
          return { message: "You are accessing root!" }
        },
        {
          beforeHandle() {
            console.log("Before Handle on Local Hook")
          },
        }
      )
      .get("/products", () => {
        return { message: "You are accessing products" }
      })
      .post(
        "/products",
        ({ body, set }) => {
          set.status = 201
          return {
            message: "Creating new product",
            product: body,
          }
        },
        {
          detail: {
            responses: {
              200: {
                description: "when success",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          body: t.Object({
            title: t.String(),
            description: t.String(),
          }),
        }
      )
  )

// .get("/products", ({ username }) => {
//   return { message: "you are accessing products", username }
// })

// routes
// .use(productsRouter)
// .use(ordersRouter)

// runner

app.listen(process.env.PORT as string, () =>
  console.log(`🦊 Server started at ${app.server?.url.origin}`)
)
