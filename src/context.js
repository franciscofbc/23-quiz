import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const url =
  'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async (url) => {
    setIsLoading(true);
    setIsWaiting(false);
    try {
      const response = await axios.get(url);
      if (response) {
        if (response.data.results.length > 0) {
          setQuestions(response.data.results);
          setIsLoading(false);
          setError(false);
          setIsWaiting(false);
        } else {
          setIsLoading(false);
          setError(true);
          setIsWaiting(true);
        }
      } else {
        setIsLoading(false);
        // setError(true);
        setIsWaiting(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => {
        return oldState + 1;
      });
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isWaiting,
        isLoading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
