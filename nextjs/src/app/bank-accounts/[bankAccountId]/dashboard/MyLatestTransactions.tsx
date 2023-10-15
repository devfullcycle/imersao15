"use client";

import { green, red } from "@mui/material/colors";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Transaction } from "../../../../models";
import { useRouter } from "next/navigation";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "created_at",
    headerName: "Data",
    width: 200,
    renderCell: (params) => new Date(params.value as string).toLocaleString(),
  },
  { field: "description", headerName: "Descrição", width: 130 },
  {
    field: "amount",
    headerName: "Valor (R$)",
    width: 180,
    renderCell: (params) => {
      const amount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(params.value as number);
      return (
        <span style={{ color: params.value < 0 ? red[500] : green[500] }}>
          {amount}
        </span>
      );
    },
  },
];

export type MyLatestTransactionsProps = {
  transactions: Transaction[];
  page?: number;
  perPage?: number;
};

export function MyLatestTransactions(props: MyLatestTransactionsProps) {
  //const router = useRouter();
  return (
    <DataGrid
      rows={props.transactions}
      columns={columns}
      // initialState={{
      //   pagination: {
      //     paginationModel: { page: props.page, pageSize: props.perPage },
      //   },
      // }}
      // pageSizeOptions={[5, 10]}
      // onPaginationModelChange={(paginationParams) => {
      //   router.push(
      //     `/bank-accounts/${props.bankAccountId}/dashboard?page=${paginationParams.page}&page_size=${paginationParams.pageSize}`
      //   );
      // }}
    />
  );
}
