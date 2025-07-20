import { fromHono } from "chanfana";
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { CakePrep } from "./endpoints/cakePrep";
import { CakeBake } from "./endpoints/cakeBake";
import { CakeList } from "./endpoints/cakeList";
import { CakeUpdate } from "./endpoints/cakeUpdate";
import { CakeDelete } from "./endpoints/cakeDelete";
import { CakeBakeFromRecipe } from "./endpoints/cakeBakeRecipe";

type Env = {
  API_KEY: string;
};

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});


app.use("*", prettyJSON(), logger(), async (c, next) => {
  const auth = bearerAuth({ token: c.env.API_KEY });
  return auth(c, next);
});

openapi.registry.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'token',
  },
)

// Register OpenAPI endpoints
openapi.post("/api/cake/prep", CakePrep);
openapi.get("/api/cake/all", CakeList);
openapi.put("/api/cake/update", CakeUpdate);
openapi.delete("/api/cake/remove/:cakeId", CakeDelete);
openapi.post("/api/cake/bake", CakeBake);
openapi.post("/api/cake/bake_recipe/:cakeId", CakeBakeFromRecipe);

// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
