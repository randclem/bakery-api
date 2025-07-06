import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, CakeOrder } from "../types";

export class CakeList extends OpenAPIRoute {
	schema = {
		tags: ["Orders"],
		summary: "Lists all Cakes",
		request: {

		},
		responses: {
			"200": {
				description: "Returns the created Order",
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
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		try {
			//let { params } = await c.req.json();
			let query = 'SELECT name, description, state, id AS orderNum FROM cakes' 
			let stmt = c.env.DB.prepare(query);
			// if (params) {
			// 	stmt = stmt.bind(params);
			// }
		

			const result = await stmt.run();

			return c.json(result);

		} catch (err)  {
			return c.json({ error: `Failed to run query: ${err}`}, 500);
		}

		// return the new order
		// return {
		// 	success: true,
		// 	order: {
		// 		name: orderToCreate.name,
		// 		description: orderToCreate.description,
		// 		state: state,
		// 		orderNum: orderNumber
		// 	},
		// };
	}
}
