'use client'

import { LiveblocksProvider } from '@liveblocks/react'
import React from 'react'

const LiveBlocksProvider = ({children}:{
    children : React.ReactNode
}) => {
    if(!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLICKEY){
        throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLICKEY is not set")
    }
  return (
    <div>
      <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"} >
      {children}
      </LiveblocksProvider>
    </div>
  )
}

export default LiveBlocksProvider
