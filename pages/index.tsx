import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Seo from "../components/Seo";

type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
};

export default function Home({
  results,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const moveToDetail = (id: number, title: string) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie: Movie) => {
        return (
          <div
            key={movie.id}
            className="movie"
            onClick={() => moveToDetail(movie.id, movie.original_title)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
            />
            <h4>
              <Link href={`/movies/${movie.original_title}/${movie.id}`}>
                <a>{movie.original_title}</a>
              </Link>
            </h4>
          </div>
        );
      })}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const currentPage: number = 1;
  const setCurrentPage = () => currentPage + 1;
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
};
