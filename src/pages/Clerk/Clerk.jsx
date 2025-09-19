import React from 'react'

import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
const clerkPubKey = "pk_test_d2VsY29tZS1odXNreS0zOS5jbGVyay5hY2NvdW50cy5kZXYk"; // from Clerk dashboard
function Clerk() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <h1>Welcome back!</h1>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </ClerkProvider>
    
  )
}

export default Clerk

