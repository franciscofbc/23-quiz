import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
function App() {
  const {
    isLoading,
    isWaiting,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (isWaiting) {
    return <SetupForm />;
  }
  if (isLoading) {
    return <Loading />;
  }

  const { correct_answer, incorrect_answers, question } = questions[index];

  const answers = [...incorrect_answers, correct_answer];

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          correct answers: {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  type="button"
                  className="answer-btn"
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => {
                    checkAnswer(correct_answer === answer);
                  }}
                />
              );
            })}
            <button
              type="button"
              className="next-question"
              onClick={nextQuestion}
            >
              next question
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
