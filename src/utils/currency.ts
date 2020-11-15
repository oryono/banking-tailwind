export function formatCurrency(amount: number) {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "UGX",
        minimumFractionDigits: 0,
    });

    return formatter.format(amount);
}