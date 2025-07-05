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
			"401": {
				description: "Invalid API Key"
			},
		},
	};

	async handle(c: AppContext) {
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated request body
		//const orderToCreate = data.body;

		// Implement your own object insertion here
		// todo create ordernumber logic
		let orderNumber = 1;
		// todo create state update logic
		let state = "New"

		// return the new order
		return {
			success: true,
			orders: {
				order: "all orders"
			},
		};
	}
}
