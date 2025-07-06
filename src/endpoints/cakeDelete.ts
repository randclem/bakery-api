import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext } from "../types";

export class CakeDelete extends OpenAPIRoute {
	schema = {
		tags: ["Orders"],
		summary: "Deletes a Cake Order",
		request: {
			params: z.object({
				cakeId: z.string()
			}),
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

		// // return the new order
		// return {
		// 	success: true,
		// 	// order: {
		// 	// 	//name: orderToCreate.name,
		// 	// 	//description: orderToCreate.description,
		// 	// 	state: state,
		// 	// 	orderNum: orderNumber
		// 	// },
		// };
	}
}
