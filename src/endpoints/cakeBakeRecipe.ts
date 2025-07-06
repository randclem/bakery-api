import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext,  CakeRecipeDBReturn } from "../types";


export class CakeBakeFromRecipe extends OpenAPIRoute {
	schema = {
		tags: ["Orders"],
		summary: "Sends an order to be baked",
		request: {
            params: z.object({
				cakeId: z.number()
			}),
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
		
		
		try {
			// Get validated data
			const data = await this.getValidatedData<typeof this.schema>();
			let query = 'SELECT name, description FROM cakes WHERE id = ?';
			let stmt = c.env.DB.prepare(query);
			if (data) {
				stmt = stmt.bind(data.params.cakeId);
			}

			const result = await stmt.run<CakeRecipeDBReturn>()
			// console.log(stmt);
			// console.log(result)
			let cake_desc = result.results[0].description + " in the form of a cake jello";

			// console.log(cake_desc);
			const inputs = {
				prompt: cake_desc,
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

		} catch (err)  {
			return c.json({ error: `Failed to run query: ${err}`}, 500);
		}

		
		
	}
}  
