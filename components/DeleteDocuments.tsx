"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {  useRouter } from "next/navigation";
import { useRoom } from "@liveblocks/react";
import { deleteDocuments } from "@/actions/actions";
import { toast } from "sonner";

const DeleteDocuments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const rooms = useRoom();
  const router = useRouter();

  const handleDelete = async () => {
    if (!rooms.id) return;

    startTransition(async () => {
      const { success } = await deleteDocuments(rooms.id);

      if (success) {
        setIsOpen(false);
        router.push("/");
        toast.success("Room Deleted Successfully")   
        
      }
      else{
        alert("Error deleting documents");
        toast.error("Failed to Delete Room")
      }
    });
  };

  return (
    
      <Dialog open={isOpen} onOpenChange={()=>setIsOpen(!isOpen)}>
        <Button asChild variant="destructive">
          <DialogTrigger>Delete </DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to permanently
              delete this file from our servers?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              
                {isPending ? "Deleting..." : "Confirm Delete"}{" "}
              
            </Button>
            <DialogClose>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
  );
};

export default DeleteDocuments;
