import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <header>
      <SignedOut>
        <SignInButton>
          <Button>
            Entrar
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </>
  )
}

export default App
