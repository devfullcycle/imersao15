import { BankAccount } from "../models";

export async function getBankAccount(
  bankAccountId: string
): Promise<BankAccount> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_API_URL}/bank-accounts/${bankAccountId}`,
    {
      next: {
        revalidate: 20,
        tags: [`bank-accounts/${bankAccountId}`]
      },
    }
  );
  return response.json();
}
