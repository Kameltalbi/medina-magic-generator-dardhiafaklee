// Analytics page with traffic analysis and conversion funnels
// Uses existing design tokens and responsive charts

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Eye, 
  MousePointer, 
  TrendingUp, 
  Globe, 
  Smartphone,
  Monitor,
  Tablet,
  Download,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Analytics = () => {
    const [deviceFilter, setDeviceFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  // Mock analytics data
  const trafficData = {
    sessions: 4892,
    uniqueVisitors: 3421,
    pageViews: 12847,
    avgSessionDuration: "3m 24s",
    bounceRate: "32.5%",
    conversionRate: "3.2%",
  };

  const deviceData = [
    { device: "Desktop", sessions: 2456, percentage: 50.2, icon: Monitor },
    { device: "Mobile", sessions: 1956, percentage: 40.0, icon: Smartphone },
    { device: "Tablet", sessions: 480, percentage: 9.8, icon: Tablet },
  ];

  const channelData = [
    { channel: "Organic Search", sessions: 2200, conversions: 45, revenue: "€6,750" },
    { channel: "Direct", sessions: 1200, conversions: 38, revenue: "€5,700" },
    { channel: "Social Media", sessions: 800, conversions: 25, revenue: "€3,750" },
    { channel: "Email", sessions: 500, conversions: 18, revenue: "€2,700" },
    { channel: "Paid Search", sessions: 192, conversions: 8, revenue: "€1,200" },
  ];

  const funnelData = [
    { step: "Visits", visitors: 4892, percentage: 100 },
    { step: "Page View", visitors: 4200, percentage: 85.9 },
    { step: "Add to Cart", visitors: 850, percentage: 17.4 },
    { step: "Checkout", visitors: 320, percentage: 6.5 },
    { step: "Purchase", visitors: 156, percentage: 3.2 },
  ];

  const topPages = [
    { url: "/", pageViews: 3250, avgTime: "2m 15s", bounceRate: "28%" },
    { url: "/rooms", pageViews: 2890, avgTime: "3m 45s", bounceRate: "32%" },
    { url: "/gallery", pageViews: 2100, avgTime: "4m 12s", bounceRate: "35%" },
    { url: "/experiences", pageViews: 1650, avgTime: "2m 58s", bounceRate: "41%" },
    { url: "/booking", pageViews: 1420, avgTime: "5m 30s", bounceRate: "25%" },
  ];

  const countryData = [
    { country: "France", sessions: 1850, percentage: 37.8 },
    { country: "Tunisia", sessions: 1200, percentage: 24.5 },
    { country: "Germany", sessions: 890, percentage: 18.2 },
    { country: "Italy", sessions: 650, percentage: 13.3 },
    { country: "Spain", sessions: 302, percentage: 6.2 },
  ];

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case "Desktop":
        return <Monitor className="w-4 h-4" />;
      case "Mobile":
        return <Smartphone className="w-4 h-4" />;
      case "Tablet":
        return <Tablet className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-indigo-medina">
            {"Analytics Trafic"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Analysez votre trafic web et comportement utilisateur"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {"Exporter"}
          </Button>
          <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
            {"Actualiser"}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sessions
            </CardTitle>
            <Eye className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.sessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Sessions totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Visiteurs uniques
            </CardTitle>
            <Users className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Utilisateurs uniques
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pages vues
            </CardTitle>
            <MousePointer className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Pages vues totales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Durée moyenne
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.avgSessionDuration}</div>
            <p className="text-xs text-muted-foreground">
              Par session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de rebond
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.bounceRate}</div>
            <p className="text-xs text-muted-foreground">
              Sessions d'une page
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de conversion
            </CardTitle>
            <MousePointer className="w-4 h-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trafficData.conversionRate}</div>
            <p className="text-xs text-muted-foreground">
              Sessions vers achat
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{"Filtres"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={deviceFilter} onValueChange={setDeviceFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{"Tous les appareils"}</SelectItem>
                <SelectItem value="desktop">{"Ordinateur"}</SelectItem>
                <SelectItem value="mobile">{"Mobile"}</SelectItem>
                <SelectItem value="tablet">{"Tablette"}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{"Tous les pays"}</SelectItem>
                <SelectItem value="france">{"France"}</SelectItem>
                <SelectItem value="tunisia">{"Tunisie"}</SelectItem>
                <SelectItem value="germany">{"Allemagne"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>{"Sources de trafic"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelData.map((channel, index) => (
                <div key={channel.channel} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-terre-cuite rounded-full"></div>
                      <span className="text-sm font-medium">{channel.channel}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{channel.sessions} sessions</div>
                      <div className="text-xs text-muted-foreground">
                        {channel.conversions} conversions
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="h-2 bg-terre-cuite rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(channel.sessions / 2200) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{channel.revenue}</span>
                    <span>{((channel.conversions / channel.sessions) * 100).toFixed(1)}% conv.</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>{"Répartition par appareil"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deviceData.map((device, index) => {
                const Icon = device.icon;
                return (
                  <div key={device.device} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{device.sessions} sessions</div>
                        <div className="text-xs text-muted-foreground">{device.percentage}%</div>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="h-2 bg-vert-porte rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${device.percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>{"Entonnoir de conversion"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((step, index) => (
              <div key={step.step} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-indigo-medina text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{step.step}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{step.visitors.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{step.percentage}%</div>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <motion.div
                    className="h-3 bg-gradient-to-r from-terre-cuite to-vert-porte rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${step.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Pages and Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>{"Pages populaires"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, index) => (
                <div key={page.url} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{page.url}</p>
                    <p className="text-xs text-muted-foreground">
                      {"Temps moyen"}: {page.avgTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{page.pageViews.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {"Taux de rebond"}: {page.bounceRate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle>{"Top Pays"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countryData.map((country, index) => (
                <div key={country.country} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{country.country}</span>
                    <div className="text-right">
                      <div className="text-sm font-medium">{country.sessions.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{country.percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="h-2 bg-indigo-medina rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${country.percentage}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
