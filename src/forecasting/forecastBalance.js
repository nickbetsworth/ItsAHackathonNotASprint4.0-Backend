/**
 * 
 * @param {number} currentBalance 
 * @param {RegularPayment[]} regularPayments 
 * @returns 
 */
const forecastBalance = (currentBalance, regularPayments) => {
  if (regularPayments.length === 0) {
    return currentBalance;
  }

  // Identify the next incoming payment
  const nextIncomingPayment = regularPayments
    .filter(payment => payment.type === 'incoming').at(0);

  // Subtract all outgoing payments between now and the next incoming payment
  const outgoingPayments = regularPayments
    .filter(payment => payment.type === 'outgoing' && payment.next_due_date <= nextIncomingPayment.next_due_date);
  const outgoingTotal = outgoingPayments.reduce((acc, payment) => acc + payment.amount, 0);
  return currentBalance - outgoingTotal;
}

export { forecastBalance}