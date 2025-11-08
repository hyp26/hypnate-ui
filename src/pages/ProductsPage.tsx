import React, { useState, useEffect } from 'react';
import { PlusCircle, MoreHorizontal, Share2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { api } from '../lib/mockApi';
import { formatCurrency } from '../lib/utils';
import { motion } from 'framer-motion';

interface Product {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
}

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const handleShare = () => {
    const message = `Check out this product: ${product.name} - ${formatCurrency(product.price)}. Order here: https://wa.me/1234567890?text=I'd like to order ${product.name}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden h-full flex flex-col glass-card">
        <div className="relative">
          <img src={product.imageUrl} alt={product.name} className="h-48 w-full object-cover" />
          <div className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm rounded-full p-1">
            <MoreHorizontal className="h-4 w-4 text-foreground" />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="truncate">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold text-primary">{formatCurrency(product.price)}</div>
            <div className="text-sm text-muted-foreground">Stock: {product.stock}</div>
          </div>
        </CardContent>
        <CardFooter>
          <button 
            onClick={handleShare}
            className="w-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors py-2 rounded-md flex items-center justify-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share on WhatsApp
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.getProducts().then((p) => setProducts(p as Product[]));
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          <PlusCircle className="h-5 w-5" />
          Add Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
