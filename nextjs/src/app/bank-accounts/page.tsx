import { Typography } from "@mui/material";
import { CardAction } from "../../components/CardAction";
import { BankAccount } from "../../models";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getBankAccounts(): Promise<BankAccount[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_API_URL}/bank-accounts`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  return response.json();
}
//http - cache

export async function HomePage() {
  const bankAccounts = await getBankAccounts();
  return (
    <div>
      <Typography variant="h4">Contas bancárias</Typography>
      <Grid2 container spacing={2} mt={1}>
        {bankAccounts.map((bankAccount) => (
          <Grid2 key={bankAccount.id} xs={12} sm={6} md={4}>
            <CardAction
              action={async () => {
                "use server";
                cookies().set("bankAccountId", bankAccount.id);
                redirect(`/bank-accounts/${bankAccount.id}/dashboard`);
              }}
            >
              <Typography variant="h5" component="div">
                {bankAccount.owner_name}
              </Typography>
              <Typography component="span">
                Conta: {bankAccount.account_number}
              </Typography>
            </CardAction>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
}

export default HomePage;
