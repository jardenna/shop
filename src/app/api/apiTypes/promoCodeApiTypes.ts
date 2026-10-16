export interface PromoCode {
  active: boolean;
  code: string;
  expiresAt: Date;
  id: string;
  label: string;
  percent: number;
  startsAt: Date;
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
