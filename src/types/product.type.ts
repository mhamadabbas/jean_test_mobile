import { Paths } from "@/api/generated/client"

export type Product = Paths.GetSearchProducts.Responses.$200['products'][number];

