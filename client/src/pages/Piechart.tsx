import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { z } from "zod";
import { PieChartSchema } from "@/types";
import axios from "axios";

const chartConfig = {
  count: {
    label: "Count",
  },
  menCothing: {
    label: "Men's clothing",
    color: "hsl(var(--chart-1))",
  },
  jewelery: {
    label: "Jewelery",
    color: "hsl(var(--chart-2))",
  },
  electronics: {
    label: "Electronics",
    color: "hsl(var(--chart-3))",
  },
  womenClothing: {
    label: "Women's clothing",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type PieChartDataType = z.infer<typeof PieChartSchema>;

const getColor = (item: PieChartDataType) => {
  if (item.category === "jewelery") return `var(--color-jewelery)`;
  else if (item.category === "men's clothing") return `var(--color-menCothing)`;
  else if (item.category === "women's clothing")
    return `var(--color-womenClothing)`;
  else return `var(--color-electronics)`;
};

export function Piechart({ month }: { month: string }) {
  const [chartData, setChartData] = useState<PieChartDataType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/month-pie-chart?month=${month}`
      );
      const data = response.data.result;
      const modifiedData = data.map((item: PieChartDataType) => ({
        category: item.category,
        count: item.count,
        fill: `${getColor(item)}`,
      }));
      setChartData(modifiedData);
      //   console.log(modifiedData);
    };
    getData();
  }, []);

  const wordMonth = (month: string) => {
    switch (month) {
      case "1":
        return "January";
      case "2":
        return "Feburary";
      case "3":
        return "March";
      case "4":
        return "April";
      case "5":
        return "May";
      case "6":
        return "June";
      case "7":
        return "July";
      case "8":
        return "August";
      case "9":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>{wordMonth(month)}'s Data</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Piechart;
