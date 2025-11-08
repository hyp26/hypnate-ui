import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Users, BarChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { api } from '../lib/mockApi';
import { formatCurrency } from '../lib/utils';
import ReactECharts from 'echarts-for-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description: string;
}

const StatCard = ({ title, value, icon: Icon, description }: StatCardProps) => (
  <Card className="glass-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  conversionRate: number;
  ordersThisMonth: number;
  salesData: { name: string; revenue: number }[];
  productPerformance: { name: string; sales: number }[];
}

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    api.getDashboardData().then((res) => setData(res as DashboardData));
  }, []);

  if (!data) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }
  
  const chartOption = {
    tooltip: { trigger: 'axis', backgroundColor: '#1E293B', borderColor: '#334155', textStyle: { color: '#E2E8F0' } },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.salesData.map(d => d.name),
      axisLine: { lineStyle: { color: '#4A5568' } },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#4A5568' } },
      splitLine: { lineStyle: { color: '#2D3748' } },
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        stack: 'Total',
        smooth: true,
        data: data.salesData.map(d => d.revenue),
        itemStyle: { color: '#4AC9C9' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#4AC9C9' }, { offset: 1, color: 'rgba(74, 201, 201, 0)' }]
          }
        },
      },
    ],
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={formatCurrency(data.totalRevenue)} icon={DollarSign} description="All-time sales" />
        <StatCard title="Total Orders" value={data.totalOrders} icon={ShoppingBag} description={`${data.ordersThisMonth} this month`} />
        <StatCard title="Avg. Order Value" value={formatCurrency(data.avgOrderValue)} icon={Users} description="Based on delivered orders" />
        <StatCard title="Conversion Rate" value={`${data.conversionRate}%`} icon={BarChart} description="Compared to last month" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 glass-card">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Revenue from the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ReactECharts option={chartOption} style={{ height: 300 }} notMerge={true} lazyUpdate={true} />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3 glass-card">
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Your best-selling products this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.productPerformance.map((product, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none truncate">{product.name}</p>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${product.sales}%` }}></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium">{product.sales} sales</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
