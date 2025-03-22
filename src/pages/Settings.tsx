
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Store, User, Receipt, Printer, Bell, Cog, Database, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Settings() {
  return (
    <div className="animate-fade-in">
      <SectionHeader 
        title="Settings" 
        description="Configure your POS system settings"
      />
      
      <Tabs defaultValue="general">
        <div className="flex flex-col md:flex-row gap-6">
          <Card className="md:w-60 shrink-0">
            <CardContent className="p-4">
              <TabsList className="flex flex-col w-full bg-transparent space-y-1 p-0 h-auto">
                <TabsTrigger value="general" className="w-full justify-start text-left px-3 data-[state=active]:bg-accent h-9">
                  <Store className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger value="user" className="w-full justify-start text-left px-3 data-[state=active]:bg-accent h-9">
                  <User className="h-4 w-4 mr-2" />
                  User Profile
                </TabsTrigger>
                <TabsTrigger value="receipt" className="w-full justify-start text-left px-3 data-[state=active]:bg-accent h-9">
                  <Receipt className="h-4 w-4 mr-2" />
                  Receipt Settings
                </TabsTrigger>
                <TabsTrigger value="printer" className="w-full justify-start text-left px-3 data-[state=active]:bg-accent h-9">
                  <Printer className="h-4 w-4 mr-2" />
                  Printer Setup
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start text-left px-3 data-[state=active]:bg-accent h-9">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="system" className="w-full justify-start text-left px-3 data-[state=active]:bg-accent h-9">
                  <Cog className="h-4 w-4 mr-2" />
                  System
                </TabsTrigger>
                <TabsTrigger value="backup" className="w-full justify-start text-left px-3 data-[state=active]:bg-accent h-9">
                  <Database className="h-4 w-4 mr-2" />
                  Backup & Restore
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>
          
          <div className="flex-1">
            <Card>
              <TabsContent value="general" className="m-0">
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure your store information</CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="store-name">Store Name</Label>
                        <Input id="store-name" defaultValue="A.I Stores" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-address">Address</Label>
                        <Textarea id="store-address" defaultValue="123 Main Street, City, Country" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-phone">Phone Number</Label>
                        <Input id="store-phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-email">Email</Label>
                        <Input id="store-email" defaultValue="contact@aistores.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Input id="currency" defaultValue="USD ($)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time-zone">Time Zone</Label>
                        <Input id="time-zone" defaultValue="UTC-5 (Eastern Time)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Input id="language" defaultValue="English" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tax-id">Tax ID / Business Number</Label>
                        <Input id="tax-id" defaultValue="12-3456789" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="user" className="m-0">
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="full-name">Full Name</Label>
                        <Input id="full-name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+1 (555) 987-6543" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Update Profile
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="receipt" className="m-0">
                <CardHeader>
                  <CardTitle>Receipt Settings</CardTitle>
                  <CardDescription>Customize your receipts</CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="receipt-header">Receipt Header</Label>
                      <Textarea id="receipt-header" defaultValue="A.I Stores\n123 Main Street, City, Country\nPhone: +1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="receipt-footer">Receipt Footer</Label>
                      <Textarea id="receipt-footer" defaultValue="Thank you for shopping with us!\nVisit us again soon." />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-tax">Show Tax Breakdown</Label>
                        <div className="text-sm text-muted-foreground">Display detailed tax information on receipts</div>
                      </div>
                      <Switch id="show-tax" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-barcode">Show Barcode</Label>
                        <div className="text-sm text-muted-foreground">Print a barcode on each receipt</div>
                      </div>
                      <Switch id="show-barcode" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-logo">Display Logo</Label>
                        <div className="text-sm text-muted-foreground">Print your store logo on receipts</div>
                      </div>
                      <Switch id="show-logo" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Receipt Settings
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="printer" className="m-0">
                <CardHeader>
                  <CardTitle>Printer Setup</CardTitle>
                  <CardDescription>Configure your receipt printer</CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                  <div className="text-center p-8">
                    <Printer className="h-12 w-12 mx-auto mb-4 text-muted-foreground/70" />
                    <h3 className="text-lg font-medium mb-2">Printer Setup Coming Soon</h3>
                    <p className="text-muted-foreground">This feature is under development and will be available soon.</p>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="notifications" className="m-0">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure alert preferences</CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Low Stock Alerts</Label>
                        <div className="text-sm text-muted-foreground">Notify when items are running low</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Daily Sales Summary</Label>
                        <div className="text-sm text-muted-foreground">Receive daily sales report</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>New User Notifications</Label>
                        <div className="text-sm text-muted-foreground">Alert when new users are created</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Updates</Label>
                        <div className="text-sm text-muted-foreground">Notify about system updates</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="system" className="m-0">
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Advanced system configuration</CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto Logout</Label>
                        <div className="text-sm text-muted-foreground">Automatically log out after 30 minutes of inactivity</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Dark Mode</Label>
                        <div className="text-sm text-muted-foreground">Enable dark mode for interface</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Sound Effects</Label>
                        <div className="text-sm text-muted-foreground">Play sound for transactions and alerts</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save System Settings
                    </Button>
                  </div>
                </CardContent>
              </TabsContent>
              
              <TabsContent value="backup" className="m-0">
                <CardHeader>
                  <CardTitle>Backup & Restore</CardTitle>
                  <CardDescription>Manage your data</CardDescription>
                </CardHeader>
                <CardContent className="pb-6 space-y-6">
                  <div className="text-center p-8">
                    <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground/70" />
                    <h3 className="text-lg font-medium mb-2">Backup & Restore Coming Soon</h3>
                    <p className="text-muted-foreground">This feature is under development and will be available soon.</p>
                  </div>
                </CardContent>
              </TabsContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
