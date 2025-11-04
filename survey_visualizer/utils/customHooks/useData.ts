import { useEffect } from "react";
import { useState } from "react";
import type { question } from "../types";


export default function useData(url : string) {
    const [data, setData] = useState<question[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url)
            if (res.ok){

                const json = await res.json()
                setData(
                    json.results.map((q : question) => ({
                        ...q,
                        question: decodeURIComponent(q.question),
                        category: decodeURIComponent(q.category),
                        correct_answer: decodeURIComponent(q.correct_answer),
                        incorrect_answers: q.incorrect_answers.map((a) =>
                            decodeURIComponent(a)
                    ),
                })) as question[]
            );
        }
        }
        fetchData()
    }, [])

    return data
}