import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext } from "../types";

export class CakeDelete extends OpenAPIRoute {
	schema = {
		tags: ["Orders"],
		summary: "Deletes a Cake Order",
		description: "Deletes a Cake Order by its ID",
		security: [{
			bearerAuth: []
		}],
		request: {
			params: z.object({
				cakeId: z.string()
			}).required(),
		},
		responses: {
			"200": {
				description: "Returns success or failure",
				content: {
					"application/json": {
						schema: z.object({
							success: Bool(),
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

			let query = 'DELETE from cakes WHERE id = ?';
			let stmt = c.env.DB.prepare(query);
			if (data) {
				stmt = stmt.bind(data.params.cakeId);
			}

			const result = await stmt.run();

			return c.json(result);
		} catch (err) {
			return c.json({ error: `Failed to run query: ${err}`}, 500);
		}
	}
}
