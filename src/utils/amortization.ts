import {Finance} from 'financejs'

const finance = new Finance();

interface MonthlyPayment {
    paymentNumber: number;
    payment: number,
    principalBalance: number;
    interestPayment: number;
    principalPayment: number;
    accInterest: number;
    interestPaymentRounded: number;
    principalPaymentRounded: number;
    principalBalanceRounded: number;
    accInterestRounded: number;
}
export function amortizationSchedule(principal: number, term: number, interestRate: number): MonthlyPayment[]  {
    const monthlyPayment = finance.AM(principal, interestRate, term, 1);
    const monthlyRate = interestRate / 12.0 / 100.0;
    const amortizationSchedule: MonthlyPayment[] = [];

    for (let i = 0; i < term; i++) {
        const prevPrincipal = i === 0 ? principal : amortizationSchedule[i - 1].principalBalance;
        const interestPayment = prevPrincipal * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        const principalBalance = Math.max(prevPrincipal - principalPayment, 0);
        const accInterest = (i === 0 ? 0 : amortizationSchedule[i - 1].accInterest) + interestPayment;
        amortizationSchedule.push({
            paymentNumber: i + 1,
            payment: monthlyPayment,
            principalBalance: principalBalance,
            interestPayment: interestPayment,
            principalPayment: principalPayment,
            accInterest: accInterest,
            interestPaymentRounded: interestPayment,
            principalPaymentRounded: principalPayment,
            principalBalanceRounded: principalBalance,
            accInterestRounded: accInterest,
        });
    }
    return amortizationSchedule;
}