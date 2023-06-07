import { useSession, signIn, signOut } from "next-auth/react";
import Navigation from "./navbar";
import { useState } from "react";
import Logo from "./Logo";

export default function Layout({children}) {
    const [showNav,setShowNav] = useState(false);
    const { data: session } = useSession()
    if( !session ) {
      return (
        <div 
        className="flex relative overflow-hidden rounded-lg bg-cover bg-no-repeat p-12 text-center">
          <div className="text-center w-full">
            <button onClick={() => signIn('google')} className="p-2 bg-slate-400 hover:bg-slate-200 rounded-lg">Login With Google</button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-gray-300 min-h-screen min-w-screen">
        <div className="flex justify-between flex-row-reverse md:hidden">
        <div className="block">
          <button onClick={() => setShowNav(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
          </button>
        </div>
          <div className="ml-32">
          <Logo />
          </div>
        </div>
        
      <div className="flex">
        <Navigation show={showNav} />
        <div className="flex-grow rounded-md p-2 m-2">
        {children}
        </div>
      </div>
      </div>
    )
  }