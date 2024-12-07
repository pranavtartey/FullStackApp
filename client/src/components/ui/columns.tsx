import { TransactionSchema } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionSchema = z.infer<typeof TransactionSchema>;

export const columns: ColumnDef<TransactionSchema>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-right">Id</div>,
    // cell: ({ row }) => {
    //   const amount = parseFloat(row.getValue("amount"));
    //   const formatted = new Intl.NumberFormat("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //   }).format(amount);

    //   return <div className="text-right font-medium">{formatted}</div>;
    // },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-center">Title</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price</div>,
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
  },
  {
    accessorKey: "sold",
    header: () => <div className="text-center">Sold</div>,
  },
  {
    accessorKey: "image",
    header: () => <div className="text-center">Image</div>,
  },
];
