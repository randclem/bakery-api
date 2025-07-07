import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, CakeOrderInput, CakeOrder } from "../types";

export class CakePrep extends OpenAPIRoute {
	schema = {
		tags: ["Orders"],
		summary: "Create a new Cake Recipe",
		request: {
			body: {
				content: {
					"application/json": {
						schema: CakeOrderInput,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Returns the prepped Recipe",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
								result: z.object({
									order: CakeOrder,
								}),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {


		// Retrieve the validated request body
		try {
			// Get validated data
			const data = await this.getValidatedData<typeof this.schema>();
			let query = 'INSERT INTO cakes (name, description, state) VALUES (?, ?, ?)';
			let stmt = c.env.DB.prepare(query);
			if (data) {
				stmt = stmt.bind(data.body.name, data.body.description, "New")
			} 	

			const result = await stmt.run();
			
			return c.json(result);
		} catch (err) {
			return c.json({ error: `Failed to run query: ${err}`}, 500);
		}
	}
}
