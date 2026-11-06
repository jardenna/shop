import { SortParams } from './adminApiTypes';

export interface ReviewsCountResponse {
  unreadCount: number;
}

export interface AdminReviewsResponse {
  createdAt: string;
  id: string;
  image: string;
  isRead: boolean;
  productId: string;
  productName: string;
  rating: number;
  user: string;
  userName: string;
  comment?: string | null;
}

export interface ReviewParams extends Partial<SortParams> {
  isRead?: boolean;
  productName?: string;
  rating?: number;
}
