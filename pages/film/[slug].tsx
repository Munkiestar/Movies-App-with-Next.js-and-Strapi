import { fetcher } from "../../lib/api";
import Layout from "../../components/Layout";
import { useFetchUser } from "../../lib/authContext";

function Film({ film }: any) {
  const { user, loading } = useFetchUser();

  console.log("film-SLUG", film);
  return (
    <Layout user={user}>
      <h1 className="t5xl mf:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500 py-2">
          {film[0]?.attributes?.title || "No Movie available"}
        </span>
      </h1>
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  // const slug = params.slug;
  // show movie by its slug
  const { slug } = params;

  const movieRes = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?filters[slug][$eq]=${slug}`
  );

  // console.log("slug", slug);
  // console.log("movieRes", movieRes);
  // console.log("movieRes-data", movieRes.data);
  return {
    props: {
      film: movieRes?.data,
    },
  };
}
export default Film;
//   `${process.env.NEXT_PUBLIC_STRAPI_URL}/slugify/slugs/films/${slug}`
