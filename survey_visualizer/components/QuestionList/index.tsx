import { useState } from "react";
import type { question } from "../../utils/types";

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

  const questions = filterByDifficulty === '' ? questionsByCategory : questionsByCategory.filter((q) => q.difficulty === filterByDifficulty)

  return (
    <>
      <div className="w-full bg-slate-500 text-white rounded-4xl p-2">
        <h2 className="text-center w-full">{category}</h2>
        <span
          onClick={() => setCategory("")}
          className="cursor-pointer hover:text-neutral-900 transition-colors"
        >
          Back to categories
        </span>
      </div>
      <div className="w-full bg-slate-500 text-white rounded-4xl p-2 mt-5 transition-all">
        <select
          className="selection:outline-0 focus:outline-0 rounded-2xl hover:text-neutral-900 transition-all cursor-pointer"
          onChange={(e) => setFilterByDifficulty(e.target.value)}
        >
          <option value="" className="bg-neutral-900 text-slate-500">
            Filter by difficulty
          </option>
          <option value="easy" className="bg-neutral-900 text-slate-500">
            Easy
          </option>
          <option value="medium" className="bg-neutral-900 text-slate-500">
            Medium
          </option>
          <option value="hard" className="bg-neutral-900 text-slate-500">
            Hard
          </option>
        </select>
      </div>
      {questions.map((q) => {
        return (
          <div className="bg-slate-500 text-white rounded-4xl m-5 w-full p-5">
            <span>Difficulty:</span>{" "}
            <span className="text-neutral-900">{q.difficulty}</span>
            <br />
            <h3 className="text-neutral-900">{q.question}</h3>
            <span>Correct answer: </span>
            <p className="text-neutral-900">{q.correct_answer}</p>
            <span>Incorrect answers:</span>
            <ul className="list-disc list-outside w-fit mx-auto">
              {q.incorrect_answers.map((ia) => {
                return (
                  <li key={ia} className="text-neutral-900">
                    {ia}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}
