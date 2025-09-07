// Settings page for global configuration (superadmin only)
// Uses existing design tokens and comprehensive settings management

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Globe, 
  CreditCard, 
  Mail, 
  Shield, 
  Database,
  Webhook,
  Cookie,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);

  // Mock settings data
  const generalSettings = {
    siteName: "Dar Dhiafa Klee",
    siteUrl: "https://dardhiafa.com",
    defaultLanguage: "fr",
    timezone: "Africa/Tunis",
    currency: "EUR",
    dateFormat: "DD/MM/YYYY",
    maintenanceMode: false,
  };

  const paymentSettings = {
    stripePublicKey: "pk_test_...",
    stripeSecretKey: "sk_test_...",
    paypalClientId: "client_id_...",
    paypalSecret: "secret_...",
    bankAccount: "TN59 12 345 678 901 234 567 89",
    vatRate: 19,
    taxIncluded: true,
  };

  const emailSettings = {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "noreply@dardhiafa.com",
    smtpPassword: "password_...",
    fromName: "Dar Dhiafa Klee",
    fromEmail: "noreply@dardhiafa.com",
    replyTo: "contact@dardhiafa.com",
  };

  const securitySettings = {
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    require2FA: false,
    passwordMinLength: 8,
    enableAuditLog: true,
    ipWhitelist: "",
  };

  const analyticsSettings = {
    googleAnalyticsId: "GA-XXXXXXXXX",
    googleTagManagerId: "GTM-XXXXXXX",
    facebookPixelId: "123456789",
    hotjarId: "1234567",
    enableCookies: true,
    cookieConsent: true,
  };

  const webhookSettings = [
    {
      id: "1",
      name: "Booking Confirmation",
      url: "https://api.dardhiafa.com/webhooks/booking",
      events: ["booking.created", "booking.confirmed"],
      isActive: true,
      lastTriggered: "2024-01-15 14:30",
    },
    {
      id: "2",
      name: "Payment Success",
      url: "https://api.dardhiafa.com/webhooks/payment",
      events: ["payment.success"],
      isActive: true,
      lastTriggered: "2024-01-15 10:15",
    },
  ];

  const handleSave = () => {
    // Save settings logic
    setHasChanges(false);
    // Show success message
  };

  const handleReset = () => {
    // Reset to default settings
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-playfair font-bold text-indigo-medina">
            {"Paramètres"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {"Configurez les paramètres globaux de l'application"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {"Réinitialiser"}
          </Button>
          <Button 
            size="sm" 
            className="bg-terre-cuite hover:bg-terre-cuite-hover"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            {"Sauvegarder"}
          </Button>
        </div>
      </div>

      {hasChanges && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {"Vous avez des modifications non sauvegardées"}
          </AlertDescription>
        </Alert>
      )}

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">{t("backoffice.settings.tabs.general")}</TabsTrigger>
          <TabsTrigger value="payment">{t("backoffice.settings.tabs.payment")}</TabsTrigger>
          <TabsTrigger value="email">{t("backoffice.settings.tabs.email")}</TabsTrigger>
          <TabsTrigger value="security">{t("backoffice.settings.tabs.security")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("backoffice.settings.tabs.analytics")}</TabsTrigger>
          <TabsTrigger value="webhooks">{t("backoffice.settings.tabs.webhooks")}</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>{t("backoffice.settings.general.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">{t("backoffice.settings.general.siteName")}</Label>
                  <Input 
                    id="siteName" 
                    defaultValue={generalSettings.siteName}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">{t("backoffice.settings.general.siteUrl")}</Label>
                  <Input 
                    id="siteUrl" 
                    defaultValue={generalSettings.siteUrl}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">{t("backoffice.settings.general.defaultLanguage")}</Label>
                  <Select defaultValue={generalSettings.defaultLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">{t("backoffice.settings.general.timezone")}</Label>
                  <Select defaultValue={generalSettings.timezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Tunis">Africa/Tunis</SelectItem>
                      <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">{t("backoffice.settings.general.currency")}</Label>
                  <Select defaultValue={generalSettings.currency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="TND">TND (د.ت)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="maintenanceMode" 
                  defaultChecked={generalSettings.maintenanceMode}
                  onCheckedChange={() => setHasChanges(true)}
                />
                <Label htmlFor="maintenanceMode">{t("backoffice.settings.general.maintenanceMode")}</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>{t("backoffice.settings.payment.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("backoffice.settings.payment.stripe")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stripePublicKey">{t("backoffice.settings.payment.stripePublicKey")}</Label>
                    <Input 
                      id="stripePublicKey" 
                      type="password"
                      defaultValue={paymentSettings.stripePublicKey}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stripeSecretKey">{t("backoffice.settings.payment.stripeSecretKey")}</Label>
                    <Input 
                      id="stripeSecretKey" 
                      type="password"
                      defaultValue={paymentSettings.stripeSecretKey}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("backoffice.settings.payment.paypal")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paypalClientId">{t("backoffice.settings.payment.paypalClientId")}</Label>
                    <Input 
                      id="paypalClientId" 
                      type="password"
                      defaultValue={paymentSettings.paypalClientId}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypalSecret">{t("backoffice.settings.payment.paypalSecret")}</Label>
                    <Input 
                      id="paypalSecret" 
                      type="password"
                      defaultValue={paymentSettings.paypalSecret}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("backoffice.settings.payment.tax")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vatRate">{t("backoffice.settings.payment.vatRate")}</Label>
                    <Input 
                      id="vatRate" 
                      type="number"
                      defaultValue={paymentSettings.vatRate}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bankAccount">{t("backoffice.settings.payment.bankAccount")}</Label>
                    <Input 
                      id="bankAccount" 
                      defaultValue={paymentSettings.bankAccount}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Switch 
                      id="taxIncluded" 
                      defaultChecked={paymentSettings.taxIncluded}
                      onCheckedChange={() => setHasChanges(true)}
                    />
                    <Label htmlFor="taxIncluded">{t("backoffice.settings.payment.taxIncluded")}</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>{t("backoffice.settings.email.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("backoffice.settings.email.smtp")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">{t("backoffice.settings.email.smtpHost")}</Label>
                    <Input 
                      id="smtpHost" 
                      defaultValue={emailSettings.smtpHost}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">{t("backoffice.settings.email.smtpPort")}</Label>
                    <Input 
                      id="smtpPort" 
                      type="number"
                      defaultValue={emailSettings.smtpPort}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">{t("backoffice.settings.email.smtpUser")}</Label>
                    <Input 
                      id="smtpUser" 
                      defaultValue={emailSettings.smtpUser}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">{t("backoffice.settings.email.smtpPassword")}</Label>
                    <Input 
                      id="smtpPassword" 
                      type="password"
                      defaultValue={emailSettings.smtpPassword}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t("backoffice.settings.email.sender")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromName">{t("backoffice.settings.email.fromName")}</Label>
                    <Input 
                      id="fromName" 
                      defaultValue={emailSettings.fromName}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">{t("backoffice.settings.email.fromEmail")}</Label>
                    <Input 
                      id="fromEmail" 
                      type="email"
                      defaultValue={emailSettings.fromEmail}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="replyTo">{t("backoffice.settings.email.replyTo")}</Label>
                    <Input 
                      id="replyTo" 
                      type="email"
                      defaultValue={emailSettings.replyTo}
                      onChange={() => setHasChanges(true)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>{t("backoffice.settings.security.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">{t("backoffice.settings.security.sessionTimeout")}</Label>
                  <Input 
                    id="sessionTimeout" 
                    type="number"
                    defaultValue={securitySettings.sessionTimeout}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">{t("backoffice.settings.security.maxLoginAttempts")}</Label>
                  <Input 
                    id="maxLoginAttempts" 
                    type="number"
                    defaultValue={securitySettings.maxLoginAttempts}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">{t("backoffice.settings.security.passwordMinLength")}</Label>
                  <Input 
                    id="passwordMinLength" 
                    type="number"
                    defaultValue={securitySettings.passwordMinLength}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ipWhitelist">{t("backoffice.settings.security.ipWhitelist")}</Label>
                  <Input 
                    id="ipWhitelist" 
                    placeholder="192.168.1.0/24, 10.0.0.0/8"
                    defaultValue={securitySettings.ipWhitelist}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="require2FA" 
                    defaultChecked={securitySettings.require2FA}
                    onCheckedChange={() => setHasChanges(true)}
                  />
                  <Label htmlFor="require2FA">{t("backoffice.settings.security.require2FA")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enableAuditLog" 
                    defaultChecked={securitySettings.enableAuditLog}
                    onCheckedChange={() => setHasChanges(true)}
                  />
                  <Label htmlFor="enableAuditLog">{t("backoffice.settings.security.enableAuditLog")}</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Settings */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>{t("backoffice.settings.analytics.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId">{t("backoffice.settings.analytics.googleAnalyticsId")}</Label>
                  <Input 
                    id="googleAnalyticsId" 
                    defaultValue={analyticsSettings.googleAnalyticsId}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="googleTagManagerId">{t("backoffice.settings.analytics.googleTagManagerId")}</Label>
                  <Input 
                    id="googleTagManagerId" 
                    defaultValue={analyticsSettings.googleTagManagerId}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebookPixelId">{t("backoffice.settings.analytics.facebookPixelId")}</Label>
                  <Input 
                    id="facebookPixelId" 
                    defaultValue={analyticsSettings.facebookPixelId}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hotjarId">{t("backoffice.settings.analytics.hotjarId")}</Label>
                  <Input 
                    id="hotjarId" 
                    defaultValue={analyticsSettings.hotjarId}
                    onChange={() => setHasChanges(true)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enableCookies" 
                    defaultChecked={analyticsSettings.enableCookies}
                    onCheckedChange={() => setHasChanges(true)}
                  />
                  <Label htmlFor="enableCookies">{t("backoffice.settings.analytics.enableCookies")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="cookieConsent" 
                    defaultChecked={analyticsSettings.cookieConsent}
                    onCheckedChange={() => setHasChanges(true)}
                  />
                  <Label htmlFor="cookieConsent">{t("backoffice.settings.analytics.cookieConsent")}</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhooks Settings */}
        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Webhook className="w-5 h-5" />
                  <span>{t("backoffice.settings.webhooks.title")}</span>
                </CardTitle>
                <Button size="sm" className="bg-terre-cuite hover:bg-terre-cuite-hover">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("backoffice.settings.webhooks.addWebhook")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhookSettings.map((webhook) => (
                  <Card key={webhook.id} className="border-l-4 border-l-terre-cuite">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{webhook.name}</h3>
                            <Badge variant={webhook.isActive ? "default" : "secondary"}>
                              {webhook.isActive ? t("backoffice.settings.webhooks.active") : t("backoffice.settings.webhooks.inactive")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{webhook.url}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{webhook.events.join(", ")}</span>
                            <span>{t("backoffice.settings.webhooks.lastTriggered")}: {webhook.lastTriggered}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
