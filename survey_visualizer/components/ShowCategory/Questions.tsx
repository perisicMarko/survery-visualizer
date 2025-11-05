import type {question} from '../../utils/types';

export default function Questions({questions, filterByDifficulty} : {questions : question[], filterByDifficulty : string}) {

  return (
    <>
      {questions.length != 0 ? (
        questions.map((q) => {
          return (
            <div
              className="bg-cyan-500 text-white rounded-4xl m-5 w-full p-2 sm:p-5"
              key={q.question}
            >
              <span>Difficulty:</span>{" "}
              <span className="text-neutral-950">{q.difficulty}</span>
              <br />
              <h3 className="text-neutral-950">{q.question}</h3>
              <span>Correct answer: </span>
              <p className="text-neutral-950">{q.correct_answer}</p>
              <span>Incorrect answers:</span>
              <ul className="list-disc list-outside w-fit mx-auto">
                {q.incorrect_answers.map((ia) => {
                  return (
                    <li key={ia} className="text-neutral-950">
                      {ia}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      ) : (
        <div className="bg-cyan-500 text-center p-2 sm:p-5 m-5 w-full rounded-4xl">
          There are no {filterByDifficulty} questions.
        </div>
      )}
    </>
  );
}
