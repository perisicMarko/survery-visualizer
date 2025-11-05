import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { useState } from "react";
import type { question } from "../../utils/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FrequencyRadar({ data }: { data: question[] }) {
  const [statisticsType, setStatisticsType] = useState<number>(
    StatisticsTypeValues.NumberOfQuestions
  );

  const chartData = processChartData(data, statisticsType);

  function chartLegend() {
    if (statisticsType === StatisticsTypeValues.NumberOfQuestions)
      return "Number of questions";
    else if (statisticsType === StatisticsTypeValues.QuestionsDifficulty)
      return "Questions by difficulty";
    else return "Questions by type";
  }

  return (
    <div className="flex justify-center items-center w-full h-[400px] relative">
      <span
        className="opacity-50 sm:opacity-30 hover:opacity-100 text-cyan-600 absolute sm:left-30 left-0 cursor-pointer scale-150 z-10"
        onClick={() => {
          if (statisticsType === StatisticsTypeValues.NumberOfQuestions)
            setStatisticsType(StatisticsTypeValues.TrueFalseQuestionNumber);
          else setStatisticsType(statisticsType - 1);
        }}
      >
        <ChevronLeft />
      </span>
      <div className="min-w-0 h-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData} outerRadius="70%">
            <PolarGrid />
            <PolarAngleAxis dataKey="key" />
            <PolarRadiusAxis />
            <Tooltip />
            <Legend />
            <Radar
              name={chartLegend()}
              dataKey="frequency"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <span
        className="opacity-50 sm:opacity-30 hover:opacity-100 text-cyan-600 absolute sm:right-30 right-0 cursor-pointer scale-150 z-10"
        onClick={() => {
          if (statisticsType === StatisticsTypeValues.TrueFalseQuestionNumber)
            setStatisticsType(StatisticsTypeValues.NumberOfQuestions);
          else setStatisticsType(statisticsType + 1);
        }}
      >
        <ChevronRight />
      </span>
    </div>
  );
}

function processChartData(data: question[], statisticsType: number) {
  const chartData: Record<string, number> = {};

  if (statisticsType === StatisticsTypeValues.NumberOfQuestions) {
    data.forEach((d) => {
      chartData[d.category] = (chartData[d.category] || 0) + 1;
    });
  } else if (statisticsType === StatisticsTypeValues.QuestionsDifficulty) {
    data.forEach((d) => {
      chartData[d.difficulty] = (chartData[d.difficulty] || 0) + 1;
    });
  } else if (statisticsType === StatisticsTypeValues.TrueFalseQuestionNumber) {
    data.forEach((d) => {
      chartData[d.type] = (chartData[d.type] || 0) + 1;
    });
  }

  const res = Object.keys(chartData).map((key) => ({
    key: key,
    frequency: chartData[key],
  }));

  return res;
}

const StatisticsTypeValues = {
  NumberOfQuestions: 1,
  QuestionsDifficulty: 2,
  TrueFalseQuestionNumber: 3,
} as const;
