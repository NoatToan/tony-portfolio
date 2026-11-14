import { fullstack } from "./fullstack";
import { mobile } from "./mobile";

export const variants = [fullstack, mobile] as const;
export { fullstack, mobile };
export type { PortfolioContent } from "./types";
