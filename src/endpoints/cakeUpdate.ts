import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, CakeOrder, CakeOrderUpdate } from "../types";

export class CakeUpdate extends OpenAPIRoute {
	schema = {
		tags: ["Orders"],
		summary: "Updates a Cake",
		description: "Updates a Cake Order by its ID",
		security: [{
			bearerAuth: []
		}],
		request: {
			body: {
				content: {
					"application/json": {
						schema: CakeOrderUpdate,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Returns the updated Order",
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
			"401": {
				description: "Invalid API Key (Bearer token)"
			},
		},
	};

	async handle(c: AppContext) {

		try {
			// Get validated data
			const data = await this.getValidatedData<typeof this.schema>();
			let query = 'UPDATE cakes SET name = ?, description = ? WHERE id = ?';
			let stmt = c.env.DB.prepare(query);
			if (data) {
				stmt = stmt.bind(data.body.name, data.body.description, data.body.orderNum);
				console.log(query);
				console.log(stmt);
			}

			const result = await stmt.run();

			return c.json(result);

		} catch (err)  {
			return c.json({ error: `Failed to run query: ${err}`}, 500);
		}
	}
}
