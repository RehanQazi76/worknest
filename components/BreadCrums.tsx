'use client'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

  
import { usePathname } from "next/navigation"
import { Fragment } from "react";

const BreadCrums = () => {
    const path = usePathname();
    const segments=path.split('/');
  return (
    <div>


        <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
         {segments.map((segment,index)=>{
            if(!segment) return null;
            
            const href= `${segments.slice(0,index+1).join('/')}`;
            const isLast= index=== segments.length -1;
            console.log("segements",segments);
            console.log("segment",segment)
            return(
               
                <Fragment  key={segment}>
                   
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem >
                    {isLast? (<BreadcrumbPage>{segment}</BreadcrumbPage>):( <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>)}
                   
                    </BreadcrumbItem>
                </Fragment>

            );
         })}
        </BreadcrumbList>
        </Breadcrumb>


    </div>
  )
}

export default BreadCrums
