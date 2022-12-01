import Layout from "../components/Layout";
import { useFetchUser } from "../lib/authContext";

export default function Home() {
  const { user } = useFetchUser();
  return (
    <Layout user={user}>
      <h1>hello</h1>
    </Layout>
  );
}
