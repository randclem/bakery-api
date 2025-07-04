import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, CakeOrderInput } from "../types";


export class CakeBake extends OpenAPIRoute {
	schema = {
		tags: ["Orders"],
		summary: "Sends an order to be baked",
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
				description: "Returns a baked cake (jpeg)",
				content: {
					"image/jpeg": {
						schema: z.any()
					},
				},
			},
		},
	};

	async handle(c: AppContext, env) {
		// Get validated data
		const data = await this.getValidatedData<typeof this.schema>();

		// Retrieve the validated request body
		const cake = data.body;
		const constructed_cake = cake.description + " in the form of a cake jello";

		const inputs = {
			prompt: constructed_cake,
		};
		
		const response = await c.env.AI.run(
			"@cf/bytedance/stable-diffusion-xl-lightning",
			inputs	
		);

		return new Response(response, {
			headers: {
				"content-type": "image/jpg",
			},
		});
	}
}  
