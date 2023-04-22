import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {

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
    <div className="flex items-center">
    Logged In as {session.user.email} <br/>
      <div className="text-center w-full">
      <button onClick={() => signOut('google')} className="p-2 bg-slate-400 hover:bg-slate-200 rounded-lg">Sign out</button>
      </div>
    </div>
  )
}