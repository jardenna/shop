export interface PromoCode {
  active: boolean;
  code: string;
  expiresAt: string;
  id: string;
  label: string;
  percent: number;
  startsAt: string;
}

export type PromoCodeStatus = 'active' | 'scheduled' | 'expired' | 'inactive';

export interface PromoCodeResponse extends PromoCode {
  status: PromoCodeStatus;
}

export interface UpdatePromoCodeRequest {
  body: PromoCode;
  id: string;
}

export interface GetPromoCodeByIdRequest {
  id: string;
}
