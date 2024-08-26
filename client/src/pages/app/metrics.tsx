import { Helmet } from 'react-helmet-async'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useGetUserCheckInMetrics } from '@/hooks/useCheckIn'

export function Metrics() {
  const { data } = useGetUserCheckInMetrics('/check-ins/metrics')

  const chartConfig = {
    count: {
      label: 'Frequência',
      color: '#2563eb',
    },
  } satisfies ChartConfig

  return (
    <>
      <Helmet title="Métricas" />

      <div className="flex h-full w-full flex-col items-start justify-start gap-24 p-10">
        <h1 className="font-poppins text-xl font-semibold">
          Confira quantas vezes você foi à academia este ano!
        </h1>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <LineChart accessibilityLayer data={data?.checkInsCountByMonth}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line dataKey="count" fill="var(--color-count)" radius={4} />
          </LineChart>
        </ChartContainer>
      </div>
    </>
  )
}
