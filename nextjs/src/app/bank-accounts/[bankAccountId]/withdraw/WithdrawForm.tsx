"use client";

import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Card } from "../../../../components/Card";
import { createTransactionAction } from "./create-transaction.action";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function WithdrawForm({ bankAccountId }: { bankAccountId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const createTransactionActionWithBankAccountId = createTransactionAction.bind(null, bankAccountId);

  function handleClose() {
    setOpen(false);
  }

  async function onSubmit(formData: FormData) {
    await createTransactionActionWithBankAccountId(formData);
    setOpen(true);
  }

  return (
    <div>
      <Typography variant="h5">Realizar transferência</Typography>
      <Card>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          action={onSubmit}
        >
          <FormControl sx={{ mt: 2 }} required>
            <FormLabel>Escolha um tipo de chave</FormLabel>
            <RadioGroup name="pix_key_kind">
              <FormControlLabel value="cpf" control={<Radio />} label="CPF" />
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="E-mail"
              />
            </RadioGroup>
          </FormControl>
          <TextField name="pix_key_key" label="Chave Pix" margin="normal" />
          <TextField name="amount" label="Valor" margin="normal" type="number" />
          <TextField name="description" label="Descrição" margin="normal" />
          <Box display={"flex"} gap={1} mt={2}>
            <Button type="submit" variant="contained">
              Concluir
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() =>
                router.push(`/bank-accounts/${bankAccountId}/dashboard`)
              }
            >
              Voltar
            </Button>
          </Box>
        </form>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Transferência realizada com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
}
