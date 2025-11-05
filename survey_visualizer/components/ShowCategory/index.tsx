import { useState } from "react";
import type { question } from "../../utils/types";
import Questions from './Questions'

export default function QuestionList({
  questionsByCategory,
  category,
  setCategory,
}: {
  questionsByCategory: question[];
  category: string;
  setCategory: (c: string) => void;
}) {
  const [filterByDifficulty, setFilterByDifficulty] = useState<string>("");

  const questions =
    filterByDifficulty === ""
      ? questionsByCategory
      : questionsByCategory.filter((q) => q.difficulty === filterByDifficulty);

  return (
    <>
      <div className="w-full bg-cyan-500 text-white rounded-4xl p-2">
        <h2 className="text-center w-full">{category}</h2>
        <span
          onClick={() => setCategory("")}
          className="cursor-pointer hover:text-neutral-950 transition-colors"
        >
          Back to categories
        </span>
      </div>
      <div className="w-full bg-cyan-500 text-white rounded-4xl p-5 mt-5 transition-all">
        <select
          className="selection:outline-0 focus:outline-0 rounded-2xl text-center hover:text-neutral-950 transition-all cursor-pointer"
          onChange={(e) => setFilterByDifficulty(e.target.value)}
        >
          <option value="" className="bg-cyan-500 text-neutral-950">
            Filter by difficulty
          </option>
          <option value="easy" className="bg-cyan-500 text-neutral-950">
            Easy
          </option>
          <option value="medium" className="bg-cyan-500 text-neutral-950">
            Medium
          </option>
          <option value="hard" className="bg-cyan-500 text-neutral-950">
            Hard
          </option>
        </select>
      </div>
      <>
        <Questions questions={questions} filterByDifficulty={filterByDifficulty} />
      </>
    </>
  );
}
