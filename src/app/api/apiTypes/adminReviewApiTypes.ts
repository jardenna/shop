import { SortParams } from './adminApiTypes';
import { BaseReviews } from './sharedApiTypes';

export interface ReviewsCountResponse {
  unreadCount: number;
}

export interface AdminReviewsResponse extends BaseReviews {
  createdAt: Date;
  id: string;
  image: string;
  isRead: boolean;
  productId: string;
  productName: string;
  userName: string;
}

export interface ReviewParams extends SortParams {
  isRead?: 'all' | 'read' | 'unread';
  productName?: string;
  rating?: string[];
}

export interface RatingDistribution {
  count: number;
  rating: number;
}

export interface ReviewStatsResponse {
  averageRating: number;
  ratingDistribution: RatingDistribution[];
  totalReviews: number;
}
