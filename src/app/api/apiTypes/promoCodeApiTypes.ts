export interface PromoCode {
  active: boolean;
  code: string;
  expiresAt: Date;
  label: string;
  percent: number;
  startsAt: Date;
}

export interface UpdatePromoCodeRequest {
  body: PromoCode;
  id: string;
}
