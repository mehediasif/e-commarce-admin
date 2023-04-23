import { useSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession()
  if(!session) return;

  return(
    <Layout>
    <div className="text-slate-700 flex justify-between">
      <h3>
      Hello, {session?.user?.email}
      </h3>
      <div className="flex bg-gray-500 gap-2 text-blue-700 rounded-md space-y-px">
        <img src={session?.user?.image} alt='' className="w-16 h-16 overflow-hidden rounded-sm" />
        <span className="px-2 py-2">
          {session?.user?.name}
        </span>
      </div>
    </div>
    </Layout>  
  )
}