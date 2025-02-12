import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

import React, {useActionState, useEffect, useState} from "react";
import {searchEmails} from "@/utils/supabase/queries";
import {Input} from "@/components/ui/input";
import Image from "next/image";
interface CollaboratorsSheetProps {
    openSheet : boolean
}

const CollaboratorsSheet : React.FC<CollaboratorsSheetProps> = ({openSheet}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<{ email: string | null, image: string | null }[]>([]);

     useEffect(() => {
         const timeout = setTimeout(async () => {
             setLoading(true);
             const data = await searchEmails(searchTerm);
             setSearchResults(data);
             setLoading(false);
         },500);
         return () => clearTimeout(timeout);
     },[searchTerm])

    return (
        <Sheet open={openSheet}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Collaborators</SheetTitle>
                </SheetHeader>
                <Input value={searchTerm} onChange={(e) => {
                    setSearchTerm(e.target.value)
                }}/>
                <Command>
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions"></CommandGroup>
                        {
                            searchResults.map((result,i) => (
                                <CommandItem key={i} className="flex flex-row gap-6">
                                    <Image src={result.image!} alt="" width={20} height={20}/>
                                    <span>{result.email}</span>
                                </CommandItem>
                            ))
                        }
                    </CommandList>
                </Command>
            </SheetContent>
        </Sheet>
    )
}

export default CollaboratorsSheet