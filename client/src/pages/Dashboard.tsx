import { Button } from "@/components/ui/button";
import { columns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { CiSearch } from "react-icons/ci";
import { TransactionSchema } from "@/types";
import { SelectTrigger } from "@radix-ui/react-select";
import axios from "axios";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { z } from "zod";

type TransactionType = z.infer<typeof TransactionSchema>;

const Dashboard = () => {
  const [tableData, setTableData] = useState<TransactionType[]>([]);
  // const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("3");
  const [searchToggle, setSearchToggle] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/get-transaction?page=${page}&search=${search}&month=${month}`
      );
      setTableData(response.data);
    };
    getData();
  }, [page, month, searchToggle]);

  const monthChangeHandler = (value: string) => {
    setMonth(value);
    console.log(`This is your select month value : ${month}`);
  };

  const searchHandler: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearch(value);
  };

  const searchSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
    setSearchToggle(!searchToggle);
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold">Transaction Dashboard</h1>
      <div>
        <div className="flex justify-between items-center">
          <form className="flex">
            <Input
              className="w-[300px]"
              placeholder="search..."
              value={search}
              onChange={searchHandler}
            />
            <button
              className="ml-3 hover:scale-105 hover:text-blue-400 transition"
              type="submit"
              onClick={searchSubmitHandler}
            >
              <CiSearch />
            </button>
          </form>

          <Select value={month} onValueChange={monthChangeHandler}>
            <SelectTrigger className="w-[180px] border rounded-md border-black-400 hover:bg-slate-700 hover:text-white transition">
              <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Months</SelectLabel>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">Novemeber</SelectItem>
                <SelectItem value="12">December</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-3  p-2 items-center justify-center">
        <button className="border bg-slate-700 text-zinc-300 p-3 rounded-lg hover:text-white transition">
          Generate Bar Chart
        </button>
        <button className="border bg-slate-700 text-zinc-300 p-3 rounded-lg hover:text-white transition">
          Generate Pie Chart
        </button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={tableData} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium text-stone-600">Page no: {page}</p>
        <div className="flex gap-3">
          <Button
            disabled={page === 1}
            onClick={() => {
              setPage((prev) => prev - 1);
            }}
          >
            prev
          </Button>
          <Button
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            next
          </Button>
        </div>
        <p className="text-lg font-medium text-stone-600">Per Page : 10</p>
      </div>
    </div>
  );
};

export default Dashboard;
