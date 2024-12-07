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
    label: "womenClothing",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

type PieChartDataType = z.infer<typeof PieChartSchema>;

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
      const modifiedData = data.map((item : PieChartDataType) => ({
        category : item.category,
        count : item.count,
        fill : `var(--color-${item.category})`
      }))
      setChartData(modifiedData);
    };
    getData();
  }, []);
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart</CardTitle>
        <CardDescription>{month}'s Data</CardDescription>
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
