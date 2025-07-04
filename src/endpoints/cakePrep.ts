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
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated request body
		const orderToCreate = data.body;

		// Implement your own object insertion here
		// todo create ordernumber logic
		let orderNumber = 1;
		// todo create state update logic
		let state = "New"

		// return the new order
		return {
			success: true,
			order: {
				name: orderToCreate.name,
				description: orderToCreate.description,
				state: state,
				orderNum: orderNumber
			},
		};
	}
}
