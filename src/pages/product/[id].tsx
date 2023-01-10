import { useRouter } from "next/router"

export default function ProductId() {
    const { query } = useRouter();

    return (
        <h1>{query["id"]}</h1>
    )
}