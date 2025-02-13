import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import React, { useEffect, useState } from "react";
import { searchEmails } from "@/utils/supabase/queries";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CollaboratorsSheetProps {
    openSheet: boolean;
    setOpenSheet: (open: boolean) => void;
    addedMembers: { id: string | null; email: string | null; image: string | null }[];
    setAddedMembers: React.Dispatch<React.SetStateAction<any>>;
}

const CollaboratorsSheet: React.FC<CollaboratorsSheetProps> = ({
                                                                   openSheet,
                                                                   setOpenSheet,
                                                                   addedMembers,
                                                                   setAddedMembers
                                                               }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<{ id: string | null; email: string | null; image: string | null }[]>([]);

    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        const timeout = setTimeout(async () => {
            setLoading(true);
            const data = await searchEmails(searchTerm);
            setSearchResults(data);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const addCollaborator = (collaborator: { id: string | null; email: string | null; image: string | null }) => {
        if (!addedMembers.some((member) => member.id === collaborator.id)) {
            setAddedMembers((prev) => [...prev, collaborator]);
        }
    };

    return (
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetContent className="w-[400px] p-6">
                <SheetHeader className="flex flex-row items-center justify-between">
                    <SheetTitle>Add Collaborators</SheetTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpenSheet(false)}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </SheetHeader>

                <div className="mt-4">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by email..."
                        className="w-full"
                    />
                </div>

                <Command className="mt-4 border rounded-lg">
                    <CommandList>
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">Searching...</div>
                        ) : searchResults.length === 0 ? (
                            <CommandEmpty>No results found.</CommandEmpty>
                        ) : (
                            <CommandGroup heading="Suggestions">
                                {searchResults.map((result, i) => (
                                    <CommandItem
                                        key={i}
                                        className="flex items-center gap-4 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                                        onClick={() => addCollaborator(result)}
                                    >
                                        <Image
                                            src={result.image || "https://github.com/shadcn.png"}
                                            alt="User avatar"
                                            width={24}
                                            height={24}
                                            className="rounded-full"
                                        />
                                        <span className="text-sm text-gray-700">{result.email}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </SheetContent>
        </Sheet>
    );
};

export default CollaboratorsSheet;
