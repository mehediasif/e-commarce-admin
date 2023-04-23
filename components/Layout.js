import { useSession, signIn, signOut } from "next-auth/react";
import Navigation from "./navbar";

export default function Layout({children}) {
    const { data: session } = useSession()
    if( !session ) {
      return (
        <div className="bg-cyan-800 w-screen h-screen flex items-center">
          <div className="text-center w-full">
            <button onClick={() => signIn('google')} className="p-2 bg-slate-400 hover:bg-slate-200 rounded-lg">Login With Google</button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-slate-600 min-h-screen min-w-screen flex">
        <Navigation />
        <div className="bg-white flex-grow rounded-md p-2 m-2">
        {children}
        </div>
        <button onClick={() => signOut('google')} className="p-2 bg-slate-400 hover:bg-slate-200 rounded-lg text-blue-500 hover:text-black">Sign out</button>
      </div>
    )
  }