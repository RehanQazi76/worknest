"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";


import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs"
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

const ChatToDocument = ({doc}:{doc:Y.Doc}) => {
    const [input,setInput]= useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [question,setQuestion]=useState("");
    const [summary, setSummary]=useState("yoo");

  

  const handleAskQuestion = async (e:FormEvent) => {
  e.preventDefault()
    setQuestion(input)
     startTransition(async () => {
          const documentData = doc.get("document-store").toJSON();
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                documentData: documentData,
                question: input,
              }),
            }
          );
    
          if (res.ok) {
            const { message } = await res.json();
            setInput("")
            setSummary(message );
            
            toast.success("Question asked Successfully");
          } else {
            toast.error(" Failed To connect to GPT ");
          }
        });
  };

  return (
    
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <Button asChild variant="outline" color="#ffff">
          <DialogTrigger>
            <MessageCircleCode className="mr-2"/>
            Chat with Document
              </DialogTrigger>
        </Button>
        <div >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chat with the document</DialogTitle>
            <DialogDescription>
             Ask a question and chat with document with AI.
            </DialogDescription>
            <hr className="mt-5"/>
            {question&&<p className="mt-5 text-gray-500 ">Your Question:{question}</p>}
          </DialogHeader>
          {summary && (
          <div className="flex flex-col items-start max-h-50 overflow-y-scroll max-sm:gap-2 p-5bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <h4 className="font-bold">
                GPT {isPending ? "is thinking..." : "Says:"}
              </h4>
            </div>
            <h4>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</h4>
          </div>
        )}
       
            
          <form
          className=" flex  gap-2"
          onSubmit={handleAskQuestion}>

            <Input
            type="text"
            placeholder="Chat with document"
            className="w-full"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            />
            <Button type="submit" disabled={!input|| isPending} color="#0000">
                {isPending?"Asking...":"Ask"}
            </Button>
            
          </form>
          
        </DialogContent>
        </div>
      </Dialog>
    
  );
};

export default ChatToDocument;
