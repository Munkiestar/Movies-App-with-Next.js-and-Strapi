import React from "react";
import Link from "next/link";
import { getLocFor } from "@typescript-eslint/typescript-estree/dist/node-utils";

function Films({ data }: any) {
  return (
    <ul className="list-none space-y-4 text-4xl font-bold mb-3">
      {data &&
        data.data.map((film: any) => {
          // console.log("FILM", film.attributes.slug);
          return (
            <li key={film.id}>
              <Link href={`film/${film.attributes.slug}`}>
                {film.attributes.title}
              </Link>
            </li>
          );
        })}
    </ul>
  );
}

export default Films;
