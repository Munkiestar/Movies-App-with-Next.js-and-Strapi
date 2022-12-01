import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import Films from "../components/Films";
import useSWR from "swr";
import { useState } from "react";
import { useFetchUser } from "../lib/authContext";

const FilmList = ({ films }: any) => {
  const { user } = useFetchUser();

  const [page, setPage] = useState<number>(1);

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=${page}&pagination[pageSize]=5`,
    fetcher,
    {
      fallbackData: films,
    }
  );

  return (
    <Layout user={user}>
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 py-2">
          Movies:
        </span>
      </h1>
      {/* fetch data from swr */}
      <Films data={data} />

      <div>
        <button
          className={`md:p-2 rounded py-2 text-white p-2 ${
            page === 1 ? "bg-gray-300" : "bg-blue-400"
          }`}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className={`md:p-2 rounded py-2 text-white p-2 m-2 ${
            page === (data && data.meta.pagination.pageCount)
              ? "bg-gray-300"
              : "bg-blue-400"
          }`}
          disabled={page === (data && data.meta.pagination.pageCount)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

        <span>{`${page} of ${data && data.meta.pagination.pageCount}`}</span>
      </div>
    </Layout>
  );
};

export default FilmList;

export async function getStaticProps() {
  const filmRes = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/films?pagination[page]=1&pagination[pageSize]=5`
  );

  return {
    props: {
      films: filmRes,
    },
  };
}
