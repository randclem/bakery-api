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
			// order: {
			// 	//name: orderToCreate.name,
			// 	//description: orderToCreate.description,
			// 	state: state,
			// 	orderNum: orderNumber
			// },
		};
	}
}
