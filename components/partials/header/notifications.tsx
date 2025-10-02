
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { 
    AlertTriangle, 
    CheckCircle, 
    Info, 
    AlertCircle,
    Clock,
    Fuel,
    Users,
    Building2
} from "lucide-react";
import { getLowStockTanks } from "@/lib/filling-station-data";

interface MacrooilNotification {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    icon: 'fuel' | 'staff' | 'station' | 'alert' | 'success' | 'info';
}

const Notifications = () => {
    const [notifications, setNotifications] = useState<MacrooilNotification[]>([]);

    useEffect(() => {
        // Initialize with system notifications
        const lowStockTanks = getLowStockTanks();
        const systemNotifications: MacrooilNotification[] = [];

        if (lowStockTanks.length > 0) {
            systemNotifications.push({
                id: `low-stock-${Date.now()}`,
                type: 'warning',
                title: 'Critical Stock Alert',
                message: `${lowStockTanks.length} tank${lowStockTanks.length !== 1 ? 's' : ''} below 20% capacity`,
                timestamp: new Date(),
                read: false,
                icon: 'fuel',
            });
        }

        // Add recent system activities
        systemNotifications.push(
            {
                id: `activity-1-${Date.now()}`,
                type: 'success',
                title: 'Station Operational',
                message: 'All MACROOIL stations are running smoothly',
                timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
                read: false,
                icon: 'station',
            },
            {
                id: `activity-2-${Date.now()}`,
                type: 'info',
                title: 'Morning Report Ready',
                message: 'Daily operational report has been generated',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
                read: true,
                icon: 'info',
            },
            {
                id: `activity-3-${Date.now()}`,
                type: 'success',
                title: 'Staff Check-in Complete',
                message: 'All morning shift staff have checked in',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
                read: true,
                icon: 'staff',
            }
        );

        setNotifications(systemNotifications);

        // Simulate real-time updates every 30 seconds
        const interval = setInterval(() => {
            if (Math.random() < 0.15) { // 15% chance
                const newNotifications = [
                    {
                        type: 'success' as const,
                        title: 'Inventory Updated',
                        message: 'Tank refill completed at Lagos Branch',
                        icon: 'fuel' as const,
                    },
                    {
                        type: 'info' as const,
                        title: 'Staff Activity',
                        message: 'New staff member onboarded',
                        icon: 'staff' as const,
                    },
                    {
                        type: 'warning' as const,
                        title: 'Maintenance Alert',
                        message: 'Scheduled maintenance due tomorrow',
                        icon: 'alert' as const,
                    },
                ];

                const randomNotif = newNotifications[Math.floor(Math.random() * newNotifications.length)];
                
                setNotifications(prev => [{
                    id: `notification-${Date.now()}-${Math.random()}`,
                    ...randomNotif,
                    timestamp: new Date(),
                    read: false,
                }, ...prev.slice(0, 7)]); // Keep only 8 notifications
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

    const getNotificationIcon = (icon: MacrooilNotification['icon'], type: MacrooilNotification['type']) => {
        const baseClasses = "h-4 w-4";
        
        switch (icon) {
            case 'fuel':
                return <Fuel className={cn(baseClasses, "text-blue-600")} />;
            case 'staff':
                return <Users className={cn(baseClasses, "text-green-600")} />;
            case 'station':
                return <Building2 className={cn(baseClasses, "text-purple-600")} />;
            case 'success':
                return <CheckCircle className={cn(baseClasses, "text-green-600")} />;
            case 'alert':
                return <AlertTriangle className={cn(baseClasses, "text-orange-600")} />;
            case 'info':
            default:
                return <Info className={cn(baseClasses, "text-blue-600")} />;
        }
    };

    const formatTimestamp = (timestamp: Date) => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        
        if (minutes < 60) {
            return `${minutes}m ago`;
        } else if (hours < 24) {
            return `${hours}h ago`;
        } else {
            return timestamp.toLocaleDateString();
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button type="button" className="relative hidden focus:ring-none focus:outline-hidden md:h-8 md:w-8 md:bg-secondary text-secondary-foreground rounded-full md:flex flex-col items-center justify-center cursor-pointer">
                    <Icon icon="heroicons-outline:bell" className="animate-tada h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge className="w-4 h-4 p-0 text-[8px] rounded-full font-semibold items-center justify-center absolute left-[calc(100%-12px)] bottom-[calc(100%-10px)]" color="destructive">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="z-999 mx-4 lg:w-[350px] p-0">
                <DropdownMenuLabel>
                    <div className="flex justify-between px-4 py-3 border-b border-default-100">
                        <div className="text-sm text-default-800 font-medium">
                            MACROOIL Notifications
                        </div>
                        <div className="text-default-800 text-xs">
                            {unreadCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-auto p-1"
                                    onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                                >
                                    Mark all read
                                </Button>
                            )}
                        </div>
                    </div>
                </DropdownMenuLabel>
                <div className="h-[300px] xl:h-[350px]">
                    <ScrollArea className="h-full">
                        {notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                <Icon icon="heroicons-outline:bell" className="h-8 w-8 mb-2 opacity-50" />
                                <p className="text-sm">No notifications</p>
                            </div>
                        ) : (
                            notifications.map((item) => (
                                <DropdownMenuItem
                                    key={item.id}
                                    className={cn(
                                        "flex gap-3 py-3 px-4 cursor-pointer group",
                                        !item.read && "bg-muted/30"
                                    )}
                                    onClick={() => markAsRead(item.id)}
                                >
                                    <div className="flex items-start gap-3 flex-1">
                                        <div className="flex-none mt-1">
                                            {getNotificationIcon(item.icon, item.type)}
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <div className="text-sm text-default-600 dark:group-hover:text-default-800 font-medium truncate">
                                                    {item.title}
                                                </div>
                                                {!item.read && (
                                                    <div className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0" />
                                                )}
                                            </div>
                                            <div className="text-xs text-default-600 dark:group-hover:text-default-700 font-light line-clamp-2">
                                                {item.message}
                                            </div>
                                            <div className="flex items-center gap-1 text-default-400 dark:group-hover:text-default-500 text-xs">
                                                <Clock className="h-3 w-3" />
                                                {formatTimestamp(item.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            ))
                        )}
                    </ScrollArea>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notifications;
