import Link from "next/link";
import Layout from "../../components/Layout";

export default function Products() {
  return(
    <Layout>
      <Link className="bg-cyan-700 text-black rounded-md py-1 px-2" href={'/products/new'}>Add New Product</Link>
    </Layout>  
  )
}