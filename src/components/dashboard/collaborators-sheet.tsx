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
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import React, { useEffect, useState} from "react";
import {searchEmails} from "@/utils/supabase/queries";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {ATTRIBUTE} from "postcss-selector-parser";
import {Button} from "@/components/ui/button";
interface CollaboratorsSheetProps {
    openSheet : boolean
    setOpenSheet : any
    addedMembers : any
    setAddedMembers : any
}

const CollaboratorsSheet : React.FC<CollaboratorsSheetProps> = ({openSheet, setOpenSheet, addedMembers, setAddedMembers}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<{ id : string | null, email: string | null, image: string | null }[]>([]);

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
                    <Button onClick={() => {setOpenSheet(false)}}>Close</Button>
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
                                <CommandItem key={i} className="flex flex-row gap-6" onClick={() => {
                                    setAddedMembers((prev) => [...prev, {id : result.id, email : result.email, image : result.image}])
                                }}>
                                    <Image src={result.image || "https://github.com/shadcn.png"} alt="" width={20} height={20}/>
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