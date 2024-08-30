import { MoreHorizontal, SquarePen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from '@/components/ui/tooltip';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Message } from './chat/data';

interface SidebarProps {
    isCollapsed: boolean;
    links: {
        name: string;
        messages: Message[];
        avatar: string;
        variant:
            | 'default'
            | 'link'
            | 'ghost'
            | 'destructive'
            | 'outline'
            | 'secondary';
    }[];
    onClick?: () => void;
    isMobile: boolean;
}

export function Sidebar({ links = [], isCollapsed, isMobile }: SidebarProps) {
    return (
        <div
            data-collapsed={isCollapsed}
            className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-4 min-w-[25%]"
        >
            {!isCollapsed && (
                <div className="flex justify-between p-2 items-center">
                    <div className="flex gap-2 items-center text-2xl">
                        <p className="font-medium">Chats</p>
                        <span className="text-zinc-300">({links.length})</span>
                    </div>

                    <div>
                        <a
                            href="#"
                            className={cn(
                                buttonVariants({
                                    variant: 'ghost',
                                    size: 'icon'
                                }),
                                'h-9 w-9'
                            )}
                        >
                            <MoreHorizontal size={20} />
                        </a>

                        <a
                            href="#"
                            className={cn(
                                buttonVariants({
                                    variant: 'ghost',
                                    size: 'icon'
                                }),
                                'h-9 w-9'
                            )}
                        >
                            <SquarePen size={20} />
                        </a>
                    </div>
                </div>
            )}
            <nav className="grid gap-4 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    isCollapsed ? (
                        <TooltipProvider key={index}>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <a
                                        href="#"
                                        className={cn(
                                            buttonVariants({
                                                variant: link.variant,
                                                size: 'icon'
                                            }),
                                            'h-11 w-11 md:h-16 md:w-16'
                                        )}
                                    >
                                        <Avatar className="flex justify-center items-center">
                                            <AvatarImage
                                                src={link.avatar}
                                                alt={link.name}
                                                width={6}
                                                height={6}
                                                className="w-10 h-10"
                                            />
                                        </Avatar>
                                        <span className="sr-only">
                                            {link.name}
                                        </span>
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    className="flex items-center gap-4"
                                >
                                    {link.name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <a
                            key={index}
                            href="#"
                            className={cn(
                                buttonVariants({
                                    variant: link.variant,
                                    size: 'default'
                                }),
                                'flex justify-start gap-4 p- '
                            )}
                        >
                            <Avatar className="flex justify-center items-center">
                                <AvatarImage
                                    src={link.avatar}
                                    alt={link.name}
                                    width={6}
                                    height={6}
                                    className="w-10 h-10"
                                />
                            </Avatar>
                            <div className="flex flex-col max-w-28">
                                <span>{link.name}</span>
                                {link.messages && link.messages.length > 0 && (
                                    <span className="text-zinc-300 text-xs truncate">
                                        {
                                            link.messages[
                                                link.messages.length - 1
                                            ].name.split(' ')[0]
                                        }
                                        :{' '}
                                        {
                                            link.messages[
                                                link.messages.length - 1
                                            ].message
                                        }
                                    </span>
                                )}
                            </div>
                        </a>
                    )
                )}
            </nav>
        </div>
    );
}
