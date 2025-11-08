import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';

const AnalyticsPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            This is a placeholder for the Analytics page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Detailed analytics and reporting features will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
