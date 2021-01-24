import {Finance} from 'financejs'
import moment from "moment";

const finance = new Finance();

interface Installment {
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
    paymentDate: string;
}

export type PaymentFrequency = 'weekly' | 'bi-weekly' | 'monthly' | 'daily'

export function amortizationSchedule(principal: number, term: number, interestRate: number, frequency: PaymentFrequency): Installment[]  {
    if (frequency === "monthly") return monthlyAmortizationSchedule(principal, term, interestRate)
    else if (frequency === "weekly") return weeklyAmortizationSchedule(principal, term, interestRate)
}

function weeklyAmortizationSchedule(principal: number, term: number, interestRate: number) {
    let date = moment()
    const rate = interestRate / 100;

    const numerator = rate * Math.pow((1 + rate), term)
    const denominator = Math.pow((1 + rate), term) - 1

    const amortization = principal * (numerator / denominator);
    const installment = Math.round(amortization * 100) / 100;

    let amortizationSchedule = [];
    for (let i = 0; i < term; i++) {
        const prevPrincipal = i === 0 ? principal : amortizationSchedule[i-1].principalBalance;
        const interestPayment = prevPrincipal * rate;
        const principalPayment = installment - interestPayment;
        const principalBalance = Math.max(prevPrincipal - principalPayment, 0);
        const accInterest = (i === 0 ? 0 : amortizationSchedule[i-1].accInterest) + interestPayment;

        amortizationSchedule.push({
            paymentNumber: i+1,
            payment: installment,
            principalBalance: principalBalance,
            interestPayment: interestPayment,
            principalPayment: principalPayment,
            accInterest: accInterest,
            paymentDate: date.add(1, 'weeks').format("YYYY-MM-DD")
        });
    }

    return amortizationSchedule;
}

function monthlyAmortizationSchedule(principal: number, term: number, interestRate: number) {
    let date = moment()
    const rate = interestRate / 100;

    const numerator = rate * Math.pow((1 + rate), term)
    const denominator = Math.pow((1 + rate), term) - 1

    const amortization = principal * (numerator / denominator);
    const installment = Math.round(amortization * 100) / 100;

    console.log(installment)

    let amortizationSchedule = [];
    for (let i = 0; i < term; i++) {
        const prevPrincipal = i === 0 ? principal : amortizationSchedule[i-1].principalBalance;
        const interestPayment = prevPrincipal * rate;
        const principalPayment = installment - interestPayment;
        const principalBalance = Math.max(prevPrincipal - principalPayment, 0);
        const accInterest = (i === 0 ? 0 : amortizationSchedule[i-1].accInterest) + interestPayment;

        amortizationSchedule.push({
            paymentNumber: i+1,
            payment: installment,
            principalBalance: principalBalance,
            interestPayment: interestPayment,
            principalPayment: principalPayment,
            accInterest: accInterest,
            paymentDate: date.add(1, 'months').format("YYYY-MM-DD")
        });
    }

    return amortizationSchedule;
}