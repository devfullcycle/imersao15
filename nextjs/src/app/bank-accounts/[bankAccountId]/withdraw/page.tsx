import { Box } from "@mui/material";
import { WithdrawForm } from "./WithdrawForm";

export default async function WithdrawPage({
  params,
}: {
  params: { bankAccountId: string };
}) {
  return (
    <Box>
      <WithdrawForm bankAccountId={params.bankAccountId} />
    </Box>
  );
}
