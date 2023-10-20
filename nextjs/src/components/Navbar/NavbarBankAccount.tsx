import { Box, Button, Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { getBankAccount } from "../../queries/get-bank-account.query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function NavbarBankAccount({
  bankAccountId,
}: {
  bankAccountId: string;
}) {
  const bankAccount = await getBankAccount(bankAccountId);
  return (
    <Box>
      <Chip
        label={
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <PersonIcon />
            <Box display={"flex"} flexDirection={"column"}>
              <span>{bankAccount.owner_name}</span>
              <span>C/C {bankAccount.account_number}</span>
            </Box>
          </Box>
        }
        sx={{
          backgroundColor: "primary.contrastText",
          py: 3
        }}
      />
      <form
        action={async () => {
          "use server";
          cookies().delete("bankAccountId");
          redirect("/");
        }}
        style={{ all: "unset"}}
      >
        <Button color="inherit" type="submit">
          Sair
        </Button>
      </form>
    </Box>
  );
}
