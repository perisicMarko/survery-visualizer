import { useState } from "react";
import "./App.css";
import "../utils/types";
import type { question } from "../utils/types";
import CategoryList from "../components/CategoryList/index";
import ShowCategory from "../components/ShowCategory/index";
import FrequencyChart from "../components/Charts/FrequencyChart.tsx";
import useData from "../utils/customHooks/useData.ts";
import Loading from "../utils/loading.tsx";

const API_URL = "https://opentdb.com/api.php?amount=50&encode=url3986";

function App() {
  const data = useData(API_URL);
  const [questionsCategory, setQuestionsCategory] = useState<string>("");
  // retrieve categories
  let categories: string[] = data
    .filter((e): e is question => e !== undefined && e !== null)
    .map((q) => q!.category);
  categories = categories
    .filter((value, index) => categories.indexOf(value) === index)
    .sort();

  return data.length === 0 ? ( // empty state animation
    <Loading />
  ) : questionsCategory === "" ? ( // data is loaded, if no category is selected, show them all, else list questions from picked category
    <>
      <CategoryList
        categories={categories}
        setCategory={(c: string) => setQuestionsCategory(c)}
      />
      <FrequencyChart data={data} />
    </>
  ) : (
    <ShowCategory
      category={questionsCategory}
      questionsByCategory={data.filter((q) => q.category === questionsCategory)}
      setCategory={(c: string) => setQuestionsCategory(c)}
    />
  );
}

export default App;
