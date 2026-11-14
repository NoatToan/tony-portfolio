import { fullstackMock } from './fullstackMock';
import { mobileContent } from './mobileContent';

export const variants = [fullstackMock, mobileContent] as const;
export { fullstackMock, mobileContent };
export type { PortfolioContent } from './schemas';
