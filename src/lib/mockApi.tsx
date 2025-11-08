import { faker } from '@faker-js/faker';

// ---- Types ----
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Dispatched'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  total: number;
  status: OrderStatus;
  date: Date;
}

// ---- Generators ----
const createRandomProduct = (): Product => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  stock: faker.number.int({ min: 0, max: 100 }),
  category: faker.commerce.department(),
  imageUrl: `${faker.image.urlLoremFlickr({
    category: 'technics',
  })}?random=${faker.string.uuid()}`,
});

const createRandomOrder = (products: Product[]): Order => {
  const product = faker.helpers.arrayElement(products);
  return {
    id: `ORDER-${faker.string.alphanumeric(6).toUpperCase()}`,
    customerName: faker.person.fullName(),
    customerPhone: faker.phone.number(),
    productName: product.name,
    total: product.price,
    status: faker.helpers.arrayElement<OrderStatus>([
      'Pending',
      'Confirmed',
      'Dispatched',
      'Delivered',
      'Cancelled',
    ]),
    date: faker.date.recent({ days: 30 }),
  };
};

// ---- Fake Data ----
const PRODUCTS: Product[] = faker.helpers.multiple(createRandomProduct, {
  count: 12,
});
const ORDERS: Order[] = faker.helpers.multiple(
  () => createRandomOrder(PRODUCTS),
  { count: 50 }
);

// ---- Dashboard Stats ----
const getDashboardData = () => {
  const deliveredOrders = ORDERS.filter(
    (o: Order) => o.status === 'Delivered'
  );
  const totalRevenue = deliveredOrders.reduce(
    (sum: number, order: Order) => sum + order.total,
    0
  );
  const totalOrders = ORDERS.length;
  const avgOrderValue =
    totalRevenue / (deliveredOrders.length || 1);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const ordersToday = ORDERS.filter((o: Order) => o.date >= today).length;
  const ordersThisWeek = ORDERS.filter(
    (o: Order) => o.date >= startOfWeek
  ).length;
  const ordersThisMonth = ORDERS.filter(
    (o: Order) => o.date >= startOfMonth
  ).length;

  const productPerformance = PRODUCTS.slice(0, 5)
    .map((p: Product) => ({
      name: p.name,
      sales: faker.number.int({ min: 10, max: 100 }),
    }))
    .sort((a, b) => b.sales - a.sales);

  const salesData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      name: d.toLocaleDateString('en-US', { weekday: 'short' }),
      revenue: faker.number.int({ min: 50, max: 500 }),
    };
  });

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    conversionRate: faker.number.float({
      min: 1,
      max: 5,
      fractionDigits: 1,
    }),
    ordersToday,
    ordersThisWeek,
    ordersThisMonth,
    productPerformance,
    salesData,
  };
};

// ---- Mock API ----
export const api = {
  getProducts: (): Promise<Product[]> =>
    new Promise((resolve) => setTimeout(() => resolve(PRODUCTS), 500)),

  getOrders: (): Promise<Order[]> =>
    new Promise((resolve) => setTimeout(() => resolve(ORDERS), 500)),

  getDashboardData: (): Promise<ReturnType<typeof getDashboardData>> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(getDashboardData()), 500)
    ),
};
