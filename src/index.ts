import { fromHono } from "chanfana";
import { Hono } from "hono";
import { CakePrep } from "./endpoints/cakePrep";
import { CakeBake } from "./endpoints/cakeBake";
import { CakeList } from "./endpoints/cakeList";
import { CakeUpdate } from "./endpoints/cakeUpdate";
import { CakeDelete } from "./endpoints/cakeDelete";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
	docs_url: "/",
});

// Register OpenAPI endpoints
openapi.post("/api/cake/prep", CakePrep);
openapi.get("/api/cake/all", CakeList);
openapi.post("/api/cake/update", CakeUpdate);
openapi.delete("/api/cake/remove/:cakeId", CakeDelete);
//openapi.get("/api/bake/:orderId", CakeOrder);
openapi.post("/api/cake/bake", CakeBake);
// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
