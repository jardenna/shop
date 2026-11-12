import { BaseReviews, SortOrder } from './sharedApiTypes';

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

export interface ReviewParams {
  isRead: 'all' | 'read' | 'unread';
  productName: string;
  rating: string[];
  sortField: string;
  sortOrder: SortOrder;
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
