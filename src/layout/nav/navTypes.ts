import type { AdminPath } from './navConstants';

export type AdminPathValue = (typeof AdminPath)[keyof typeof AdminPath];
