import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring";
import Seo from "../../components/Seo"



export default function MovieDetail({ params, result }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const [title, id] = params.params || [];
    return (
        <div>
            <Seo title={title} />
            <h3>{title}</h3>
            <p>{result.overview}</p>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps  = async (ctx) => {
    const params = ctx.params as ParsedUrlQuery
    const result = await (await fetch(`http://localhost:3000/api/movies/${params.params !== undefined && params.params[1]}`)).json()
    
    
    return {
        props: {
            params,
            result,
        }
    }
}