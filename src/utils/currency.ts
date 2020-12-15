export function formatCurrency(amount: number, currency: string = "UGX") {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    });

    return formatter.format(amount);
}