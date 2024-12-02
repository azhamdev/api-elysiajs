import { Elysia } from "elysia"
import { productsRouter } from "./routes/products.route"
import { ordersRouter } from "./routes/orders.route"

// chaining method
const app = new Elysia()
  // Global Hooks
  .onBeforeHandle(({ headers, set }) => {
    // if !headers.authorization -> throw 401
    const { authorization } = headers
    if (authorization !== "myapitoken") {
      set.status = 401
      return {
        message: "Not authorized, and stop on this point",
      }
    }

    // validation
    // if return something, and stop on this point
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

// routes
// .use(productsRouter)
// .use(ordersRouter)

// runner
app.listen(process.env.PORT as string, () =>
  console.log(`🦊 Server started at ${app.server?.url.origin}`)
)
