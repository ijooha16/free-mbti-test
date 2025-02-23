import { useState } from "react";
import { questions } from "../data/questions";
import Btn from "./Btn";
import { toast } from "react-toastify";

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(
    Array(questions.length).fill({ type: "", answer: "" })
  );

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer };
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answers.length < 20) return toast.warn("모든 선택지를 선택해주세요");
    onSubmit(answers);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center space-y-6 p-6 bg-white rounded-lg"
    >
      <div>
        {questions.map((q, index) => (
          <div key={q.id} className="mb-6 mb-[80px]">
            <p className="font-semibold text-lg mb-[20px]">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((option, i) => (
                <label
                  key={i}
                  className={`block p-3 border rounded-lg cursor-pointer transition-colors duration-300 ${
                    answers[index]?.answer === option
                      ? "bg-primary text-white hover:bg-sub01"
                      : "hover:bg-lightgray"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index]?.answer === option}
                    onChange={() => handleChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Btn type="submit" text="제출하기" />
    </form>
  );
};

export default TestForm;
