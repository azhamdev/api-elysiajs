import { Elysia } from "elysia"
import { productsRouter } from "./routes/products.route"
import { ordersRouter } from "./routes/orders.route"

// chaining method
const app = new Elysia()
  // routes
  .use(productsRouter)
  .use(ordersRouter)

// runner
app.listen(process.env.PORT as string, () =>
  console.log(`🦊 Server started at ${app.server?.url.origin}`)
)
