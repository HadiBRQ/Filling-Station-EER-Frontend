"use client"

import * as React from "react"
import { useSession } from "next-auth/react";
import { ChevronsUpDown, Check, CirclePlus } from 'lucide-react';

import { cn } from "@/lib/utils"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useConfig } from "@/hooks/use-config";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion } from "framer-motion";
import { useMenuHoverConfig } from "@/hooks/use-menu-hover";

const groups = [
    {
        label: "Primary Station",
        teams: [
            {
                label: "MACROOIL PETROLEUM HQ",
                value: "headquarters",
            },
        ],
    },
    {
        label: "Regional Operations",
        teams: [
            // {
            //     label: "Lagos Region",
            //     value: "lagos-region",
            // },
            // {
            //     label: "Abuja Region",
            //     value: "abuja-region",
            // },
        ],
    },
]

type Team = (typeof groups)[number]["teams"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps { }

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
    const [config] = useConfig();
    const [hoverConfig] = useMenuHoverConfig();
    const { hovered } = hoverConfig;
    const { data: session } = useSession();
    const [open, setOpen] = React.useState(false)
    const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
    const [selectedTeam, setSelectedTeam] = React.useState<Team>(
        groups[0].teams[0]
    )
    if (config.showSwitcher === false || config.sidebar === 'compact') return null


    return (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
            <Popover open={open} onOpenChange={setOpen}>

                <PopoverTrigger asChild>

                    <motion.div
                        key={(config.collapsed && !hovered) ? "collapsed" : "expanded"}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {(config.collapsed && !hovered) ? <Button
                            variant="outline"
                            color="secondary"
                            role="combobox"
                            fullWidth
                            aria-expanded={open}
                            aria-label="Select a team"
                            className={cn("  h-14 w-14 mx-auto  p-0 md:p-0  dark:border-secondary ring-offset-sidebar", className)}
                        >
                            <Avatar className="">
                                <AvatarImage
                                    height={24}
                                    width={24}
                                    src="/images/avatar/av-1.jpg"
                                    alt={selectedTeam.label}
                                    className="grayscale"
                                />

                                <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Button> : <Button
                            variant="outline"
                            color="secondary"
                            role="combobox"
                            fullWidth
                            aria-expanded={open}
                            aria-label="Select a team"
                            className={cn("  h-auto py-3 md:px-3 px-3 justify-start dark:border-secondary ring-offset-sidebar", className)}
                        >
                            <div className=" flex  gap-2 flex-1 items-center">
                                <Avatar className=" flex-none h-[38px] w-[38px]">
                                    <AvatarImage
                                        height={38}
                                        width={38}
                                        src="/images/avatar/av-1.jpg"
                                        alt=""
                                        className="grayscale"
                                    />

                                    <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 text-start w-[100px]">

                                    <div className=" text-sm  font-semibold text-default-900">Station Manager</div>
                                    <div className=" text-xs font-normal text-default-500 dark:text-default-700 truncate ">{selectedTeam.label}</div>

                                </div>
                                <div className="">
                                    <ChevronsUpDown className="ml-auto h-5 w-5 shrink-0  text-default-500 dark:text-default-700" />
                                </div>
                            </div>
                        </Button>}
                    </motion.div>

                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandList>
                            <CommandInput placeholder="Search station..." className=" placeholder:text-xs" />
                            <CommandEmpty>No station found.</CommandEmpty>
                            {groups.map((group) => (
                                <CommandGroup key={group.label} heading={group.label}>
                                    {group.teams.map((team) => (
                                        <CommandItem
                                            key={team.value}
                                            onSelect={() => {
                                                setSelectedTeam(team)
                                                setOpen(false)
                                            }}
                                            className="text-sm font-normal"
                                        >

                                            {team.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selectedTeam.value === team.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                        </CommandList>
                        <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <DialogTrigger asChild>
                                    <CommandItem
                                        onSelect={() => {
                                            setOpen(false)
                                            setShowNewTeamDialog(true)
                                        }}
                                    >
                                        <CirclePlus className="mr-2 h-5 w-5" />
                                        Add New Station
                                    </CommandItem>
                                </DialogTrigger>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Station</DialogTitle>
                    <DialogDescription>
                        Register a new MACROOIL PETROLEUM LIMITED filling station to the EER management system.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <div className="space-y-4 py-2 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Station Name</Label>
                            <Input id="name" placeholder="MACROOIL PETROLEUM - Victoria Island" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="plan">Station Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select station type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="flagship">
                                        <span className="font-medium">Flagship</span> -{" "}
                                        <span className="text-muted-foreground">
                                            Major urban location
                                        </span>
                                    </SelectItem>
                                    <SelectItem value="standard">
                                        <span className="font-medium">Standard</span> -{" "}
                                        <span className="text-muted-foreground">
                                            Regular retail station
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
                        Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
