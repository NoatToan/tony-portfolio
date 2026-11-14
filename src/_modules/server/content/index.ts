import { fullstackMock } from './fullstackMock';
import { mobileMock } from './mobileMock';

export const variants = [fullstackMock, mobileMock] as const;
export { fullstackMock, mobileMock };
export type { PortfolioContent } from './schemas';
