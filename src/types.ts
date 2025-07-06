import { DateTime, Enumeration, Str } from "chanfana";
import type { Context } from "hono";
import { number, z } from "zod";

type Env = {
	DB: D1Database;
	AI: Ai;
}

export type AppContext = Context<{ Bindings: Env }>;


export const CakeOrderInput = z.object({
	name: Str({ example: "cake_order", required: true}),
	description: Str({ required: true}),
})

export const CakeOrderUpdate = z.object({
	orderNum: number(),
	name: Str({ example: "cake_order", required: true}),
	description: Str({ required: true}),
})


export const CakeOrder = z.object({
	name: Str({ example: "cake_order", required: true}),
	description: Str({ required: true}),
	state: z.enum(["New", "InProgress", "Completed"]),
	orderNum: number(),
})



export const OrderToSend = z.number()