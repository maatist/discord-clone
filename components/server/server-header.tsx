"use client"

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { ChevronDownIcon, LogOut, PlusCircle, Settings, TrashIcon, UserPlus, Users } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
}

export const ServerHeader = ({
    server,
    role
}: ServerHeaderProps) => {

    const { onOpen } = useModal();

    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;


    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="focus:outline-none"
                asChild
            >
                <button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                    {server.name}
                    <ChevronDownIcon className="w-5 h-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]"
            >
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("invite", { server })}
                        className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                    >
                        Agregar miembro
                        <UserPlus className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Ajustes de servidor
                        <Settings className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Administrar miembros
                        <Users className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Crear canal
                        <PlusCircle className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Eliminar Servidor
                        <TrashIcon className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Salir del servidor
                        <LogOut className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
