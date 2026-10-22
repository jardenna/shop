import { roleValues, statusValues } from '../apiConstants';
import { DefaultResponse, SortOrder } from './sharedApiTypes';

export type Roles = (typeof roleValues)[number];

export type Status = (typeof statusValues)[number];

export type ScheduledResponse = {
  hasScheduled: boolean;
};

export type UploadResponse = DefaultResponse & {
  images: string[];
};

export type SortParams = {
  sortField: string;
  sortOrder: SortOrder;
};

export type FileName = 'images';
