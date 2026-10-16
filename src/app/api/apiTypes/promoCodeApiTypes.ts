export interface PromoCode {
  active: boolean;
  code: string;
  expiresAt: Date;
  label: string;
  percent: number;
  startsAt: Date;
}
