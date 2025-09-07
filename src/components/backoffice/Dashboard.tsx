// Dashboard component - Main overview with KPIs and analytics
// Uses existing design tokens and responsive grid layout
// French only - no translations

import { motion } from "framer-motion";
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  // Mock data - replace with real API calls
  const kpiData = [
    {
      title: "Chiffre d'affaires",
      value: "€24,580",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Ventes",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: "Taux de conversion",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600",
    },
    {
      title: "Panier moyen",
      value: "€157.50",
      change: "+5.1%",
      trend: "up",
      icon: MousePointer,
      color: "text-purple-600",
    },
    {
      title: "Visites",
      value: "4,892",
      change: "+15.3%",
      trend: "up",
      icon: Eye,
      color: "text-indigo-600",
    },
    {
      title: "Visiteurs uniques",
      value: "3,421",
      change: "+11.7%",
      trend: "up",
      icon: Users,
      color: "text-teal-600",
    },
  ];

  const channelData = [
    { name: "Organic", value: 45, color: "bg-green-500" },
    { name: "Direct", value: 25, color: "bg-blue-500" },
    { name: "Social", value: 15, color: "bg-purple-500" },
    { name: "Email", value: 10, color: "bg-orange-500" },
    { name: "Paid", value: 5, color: "bg-red-500" },
  ];

  const topPages = [
    { url: "/", visits: 1250, bounceRate: "32%" },
    { url: "/rooms", visits: 890, bounceRate: "28%" },
    { url: "/gallery", visits: 650, bounceRate: "35%" },
    { url: "/experiences", visits: 420, bounceRate: "41%" },
    { url: "/booking", visits: 380, bounceRate: "25%" },
  ];

  const topCampaigns = [
    { name: "Summer Promotion", source: "Google Ads", sessions: 450, conversions: 23, revenue: "€3,450" },
    { name: "Facebook Campaign", source: "Facebook", sessions: 320, conversions: 18, revenue: "€2,890" },
    { name: "Email Newsletter", source: "Mailchimp", sessions: 280, conversions: 15, revenue: "€2,100" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-indigo-medina">
            {"Tableau de bord"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Vue d'ensemble de vos performances commerciales"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            {"Exporter"}
          </Button>
          <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
            {"Actualiser"}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <div className="flex items-center space-x-1 text-xs">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-600" />
                    )}
                    <span className={kpi.trend === "up" ? "text-green-600" : "text-red-600"}>
                      {kpi.change}
                    </span>
                    <span className="text-muted-foreground">
                      {"vs mois dernier"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{"Revenus & Ventes"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  {"Le graphique sera affiché ici"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>{"Sources de trafic"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelData.map((channel, index) => (
                <div key={channel.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{channel.name}</span>
                    <span>{channel.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${channel.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${channel.value}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages and Campaigns */}
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
                      {"Taux de rebond"}: {page.bounceRate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{page.visits}</p>
                    <p className="text-xs text-muted-foreground">
                      {"visites"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>{"Top Campagnes"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCampaigns.map((campaign, index) => (
                <div key={campaign.name} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{campaign.name}</p>
                      <p className="text-xs text-muted-foreground">{campaign.source}</p>
                    </div>
                    <p className="text-sm font-medium text-terre-cuite">{campaign.revenue}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">{"Sessions"}</p>
                      <p className="font-medium">{campaign.sessions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{"Conversions"}</p>
                      <p className="font-medium">{campaign.conversions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{"Taux de conv."}</p>
                      <p className="font-medium">
                        {((campaign.conversions / campaign.sessions) * 100).toFixed(1)}%
                      </p>
                    </div>
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

export default Dashboard;
