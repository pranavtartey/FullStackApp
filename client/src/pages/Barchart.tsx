import { BarChartSchema } from "@/types";
import axios from "axios";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useEffect, useState } from "react";
import { z } from "zod";

type ChartDataType = z.infer<typeof BarChartSchema>;

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "#2563eb",
  },
} satisfies ChartConfig;



const Barchart = ({ month }: { month: string }) => {
    const [chartData, setChartData] = useState<ChartDataType[]>([]);
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_BACKEND_URL
                    }/api/v1/month-bar-chart?month=${month}`
                );
                setChartData(response.data.barChartRange);
      //   console.log("This is your barchart data : ", chartData);
    };
    getData();
  }, []);

  const wordMonth = (month : string) => {
    switch(month){
        case "1" : return "January"
        case "2" : return "Feburary"
        case "3" : return "March"
        case "4" : return "April"
        case "5" : return "May"
        case "6" : return "June"
        case "7" : return "July"
        case "8" : return "August"
        case "9" : return "September"
        case "10" : return "October"
        case "11" : return "November"
        case "12" : return "December"
    }
  }


  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="range"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="count" fill="var(--color-count)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default Barchart;
