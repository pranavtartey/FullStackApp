import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MonthStatsSchema } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";

type MonthStatsDataType = z.infer<typeof MonthStatsSchema>;

const MonthStats = ({ month }: { month: string }) => {
  const [monthStats, setMonthStats] = useState<MonthStatsDataType>({
    totalAmount: 0,
    soldItemsCount: 0,
    unSoldItemsCount: 0,
  });

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

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/month-stats?month=${month}`
      );
      setMonthStats(response.data);
      console.log("This is your month stats : ", response.data);
    };
    getData();
  }, [month]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Month Stats</CardTitle>
        <CardDescription>{wordMonth(month)}'s Overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <li>Total Amount : {monthStats.totalAmount}</li>
          <li>Sold Items : {monthStats.soldItemsCount}</li>
          <li>Unsold Items : {monthStats.unSoldItemsCount}</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default MonthStats;
