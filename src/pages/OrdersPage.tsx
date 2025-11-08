import React, { useState, useEffect } from 'react';
import { api } from '../lib/mockApi';
import { cn, formatCurrency } from '../lib/utils';
import { Card, CardContent } from '../components/ui/Card';

interface Order {
  id: string;
  customerName: string;
  productName: string;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  date: string;
}

const statusColors: Record<Order['status'], string> = {
  Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
  Dispatched: 'bg-purple-100 text-purple-800 border-purple-200',
  Delivered: 'bg-green-100 text-green-800 border-green-200',
  Cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
  api.getOrders().then((res) => {
    const data = (res as import('../lib/mockApi').Order[]).map(o => ({
      ...o,
      date: o.date.toString(),
    }));
    setOrders(data);
  });
}, []);

  const filteredOrders = orders.filter(order => filter === 'All' || order.status === filter);

  const statusTabs = ['All', 'Pending', 'Confirmed', 'Dispatched', 'Delivered', 'Cancelled'];

  return (
    <div className="animate-fade-in">
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center py-4 border-b border-border">
            <div className="flex items-center gap-2">
              {statusTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={cn(
                    'px-3 py-1 text-sm rounded-md transition-colors',
                    filter === tab
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">Order ID</th>
                  <th scope="col" className="px-6 py-3">Customer</th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">Total</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/50" style={{ animationDelay: `${index * 20}ms` }}>
                    <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4">{order.customerName}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{order.productName}</td>
                    <td className="px-6 py-4">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className={cn('px-2 py-1 text-xs font-medium rounded-full border', statusColors[order.status])}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;
