import { roleValues, statusValues } from '../apiConstants';
import { DefaultResponse, SortOrder } from './sharedApiTypes';

export type Roles = (typeof roleValues)[number];

export type Status = (typeof statusValues)[number];

export interface ScheduledResponse {
  hasScheduled: boolean;
}

export interface UploadResponse extends DefaultResponse {
  images: string[];
}

export type SortParams = {
  sortField: string;
  sortOrder: SortOrder;
};

export type FileName = 'images';
