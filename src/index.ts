import { fromHono } from "chanfana";
import { Hono } from "hono";
import { CakePrep } from "./endpoints/cakePrep";
import { CakeBake } from "./endpoints/cakeBake";
import { CakeList } from "./endpoints/cakeList";
import { CakeUpdate } from "./endpoints/cakeUpdate";
import { CakeDelete } from "./endpoints/cakeDelete";
import { CakeBakeFromRecipe } from "./endpoints/cakeBakeRecipe";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

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
