export interface BasePromoCode {
  code: string;
  expiresAt: string;
  label: string;
  startsAt: string;
}

export interface PromoCode extends BasePromoCode {
  active: boolean;
  percent: number;
  id?: string;
}

export type PromoCodeStatus = 'active' | 'scheduled' | 'expired' | 'inactive';

export interface PromoCodeResponse extends PromoCode {
  status: PromoCodeStatus;
}

export interface UpdatePromoCodeRequest {
  body: PromoCode;
  id: string;
}
