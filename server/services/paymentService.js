export const processPayment = async ({ payment, user, order }) => {
  switch (payment.method) {
    case PAYMENT_METHODS.VISA:
    case PAYMENT_METHODS.MASTERCARD:
      return processCardPayment({ payment, user, order });

    case PAYMENT_METHODS.MOBILEPAY:
      return processMobilePayPayment({ payment, user, order });

    case PAYMENT_METHODS.PAYPAL:
      return processPayPalPayment({ payment, user, order });

    default:
      throw new Error('Unsupported payment method');
  }
};
