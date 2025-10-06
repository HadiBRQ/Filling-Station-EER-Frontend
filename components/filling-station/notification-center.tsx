"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  X, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  AlertCircle,
  Clock
} from "lucide-react";
import { getLowStockTanks } from "@/lib/filling-station-data";

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionable?: boolean;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Initialize with system notifications
    const lowStockTanks = getLowStockTanks();
    const systemNotifications: Notification[] = [];

    if (lowStockTanks.length > 0) {
      systemNotifications.push({
        id: `low-stock-${Date.now()}`,
        type: 'warning',
        title: 'Low Stock Alert',
        message: `${lowStockTanks.length} tank${lowStockTanks.length !== 1 ? 's' : ''} require immediate attention`,
        timestamp: new Date(),
        read: false,
        actionable: true,
      });
    }

    // Add welcome notification
    systemNotifications.push({
      id: `welcome-${Date.now()}`,
      type: 'info',
      title: 'Welcome to MACROOIL Dashboard',
      message: 'All systems are operational. Start managing your filling station network.',
      timestamp: new Date(),
      read: false,
    });

    setNotifications(systemNotifications);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 30 seconds
        const randomNotifications = [
          {
            type: 'success' as const,
            title: 'Inventory Updated',
            message: 'Tank refill completed successfully at Lagos Branch',
          },
          {
            type: 'info' as const,
            title: 'Staff Check-in',
            message: 'Morning shift started at Abuja Central',
          },
          {
            type: 'warning' as const,
            title: 'Maintenance Due',
            message: 'Scheduled maintenance required for Tank A2',
          },
        ];

        const randomNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        
        setNotifications(prev => [{
          id: `notification-${Date.now()}`,
          ...randomNotif,
          timestamp: new Date(),
          read: false,
        }, ...prev.slice(0, 9)]); // Keep only 10 notifications
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getBadgeColor = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return 'default';
      case 'warning':
        return 'warning';
      case 'success':
        return 'secondary';
      case 'error':
        return 'destructive';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            color="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {showNotifications && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-hidden shadow-lg border z-50 bg-background">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      !notification.read ? 'bg-muted/50 border-primary/20' : 'bg-muted/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex gap-2 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm truncate">
                              {notification.title}
                            </p>
                            <Badge 
                              color={getBadgeColor(notification.type)}
                              className="text-xs"
                            >
                              {notification.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}