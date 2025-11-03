import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import "../utils/types";
import type { question } from "../utils/types";
import "../utils/data";
import { saved_data } from "../utils/data";
import CategoryList from "../components/CategoryList/index";
import QuestionList from "../components/QuestionList/index";

function App() {
  const [data, setData] = useState<question[]>([]);
  const [questionsCategory, setQuestionsCategory] = useState<string>("");

  useEffect(() => {
    const fetchApi = async () => {
      const res = saved_data;
      // decode encoded strings
      setData(
        res.results.map((q) => ({
          ...q,
          question: decodeURIComponent(q.question),
          category: decodeURIComponent(q.category),
          correct_answer: decodeURIComponent(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((a) =>
            decodeURIComponent(a)
          ),
        })) as question[]
      );
    };
    fetchApi();
  }, []);

  // retrieve categories
  let categories: string[] = data
    .filter((e): e is question => e !== undefined && e !== null)
    .map((q) => q!.category);
  categories = categories.filter(
    (value, index) => categories.indexOf(value) === index
  );


  return questionsCategory === "" ? ( // if no category is selected, show them all, else list questions from picked category
    <CategoryList
      categories={categories}
      setCategory={(c : string) => setQuestionsCategory(c)}
    />
  ) : (
    <QuestionList
      category={questionsCategory}
      questionsByCategory={data.filter((q) => q.category === questionsCategory)}
      setCategory={(c : string) => setQuestionsCategory(c)}
    />
  );
}

export default App;
