import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import "./modal.css"; // Import modal CSS file
import { Box, Button, Heading, Text, Flex } from "@chakra-ui/react";
import arbitrum from "../../../assets/Ethereum.png";


const Lisk = () => {
  const [showModal, setShowModal] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [quizResult, setQuizResult] = useState({});
  const [totalScore, setTotalScore] = useState(() => {
    // Retrieve the total score from localStorage or default to 0 if not present
    return parseInt(localStorage.getItem("totalScore")) || 0;
  });
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(0); // New state for total questions answered

  const currentRead = "Ethereum";
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // 10 seconds in milliseconds

    return () => clearTimeout(timer);
  }, []); // Run only once on component mount

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (
        (showModal || showResultModal) &&
        !event.target.closest(".modal-content")
      ) {
        setShowModal(false);
        setShowResultModal(false);
      }
    };

    window.addEventListener("click", handleClickOutsideModal);

    return () => {
      window.removeEventListener("click", handleClickOutsideModal);
    };
  }, [showModal, showResultModal]);

  const QuizData = [
    // Quiz questions and answers data
    {
      question: "What is Ethereum?",
      options: [
        "A cryptocurrency",
        "A blockchain scaling solution",
        "A decentralized exchange",
        "A smart contract platform",
      ],
      answer: 3,
    },
    {
      question: "Who invented Bitcoin?",
      options: [
        "Satoshi Nakamoto",
        "Vitalik Buterin",
        "Charlie Lee",
        "Hal Finney",
      ],
      answer: 0,
    },
    {
      question: "What is the maximum supply of Bitcoin?",
      options: [
        "21 million BTC",
        "100 million BTC",
        "1 billion BTC",
        "Unlimited",
      ],
      answer: 0,
    },
    {
      question: "What consensus mechanism does Bitcoin use?",
      options: [
        "Proof of Work (PoW)",
        "Proof of Stake (PoS)",
        "Delegated Proof of Stake (DPoS)",
        "Proof of Authority (PoA)",
      ],
      answer: 0,
    },
    {
      question: "What is the function of a cryptocurrency wallet?",
      options: [
        "To exchange cryptocurrencies",
        "To store private keys",
        "To mine new coins",
        "To execute smart contracts",
      ],
      answer: 1,
    },
    {
      question: "What is a decentralized autonomous organization (DAO)?",
      options: [
        "A type of cryptocurrency",
        "A form of smart contract",
        "An organization governed by its members through code",
        "A consensus algorithm",
      ],
      answer: 2,
    },
    {
      question: "What does ICO stand for in the context of cryptocurrency?",
      options: [
        "Initial Coin Offering",
        "International Cryptocurrency Organization",
        "Independent Crypto Operators",
        "Initial Centralized Offering",
      ],
      answer: 0,
    },
    {
      question:
        "What is the purpose of a whitepaper in the cryptocurrency space?",
      options: [
        "To explain the technology behind a project",
        "To outline a project's marketing strategy",
        "To provide legal advice",
        "To predict future cryptocurrency prices",
      ],
      answer: 0,
    },
    {
      question: "What is the role of a blockchain node?",
      options: [
        "To validate transactions and maintain the network",
        "To mine new cryptocurrency",
        "To act as a cryptocurrency wallet",
        "To create smart contracts",
      ],
      answer: 0,
    },
    {
      question: "What is the purpose of a private key in cryptocurrency?",
      options: [
        "To access a cryptocurrency exchange",
        "To identify the owner of a cryptocurrency wallet",
        "To validate transactions on the blockchain",
        "To execute smart contracts",
      ],
      answer: 1,
    },
  ];

  const handleAnswerChange = (questionIndex, selectedOptionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedOptionIndex,
    });
  };

  const handleSubmit = () => {
    // Logic to evaluate user's answers
    const result = {};
    let score = 0;
    let answeredCount = 0; // Count the number of questions answered

    QuizData.forEach((questionData, index) => {
      const userAnswer = userAnswers[index];
      result[index] = userAnswer === questionData.answer;

      if (result[index]) {
        score += 15; // 5 points for each correct answer
        answeredCount++; // Increment answered count
      }
    });

    // Retrieve the existing total score from localStorage
    const existingTotalScore =
      parseInt(localStorage.getItem("totalScore")) || 0;

    // Calculate the new total score by adding the existing score and the new score
    const newTotalScore = existingTotalScore + score;

    // Save the new total score to localStorage
    localStorage.setItem("totalScore", newTotalScore.toString());

    // Update the state with the new total score and total questions answered
    setTotalScore(newTotalScore);
    setTotalQuestionsAnswered(answeredCount);
    setQuizResult(result);
    setShowResultModal(true);
  };

  const handleRefresh = () => {
    // Reload the page
    window.location.reload();
  };

  const handleDeleteTotalPoints = () => {
    // Reset the total points to 0
    localStorage.removeItem("totalScore");
    setTotalScore(0);
    setTotalQuestionsAnswered(0);
    setQuizResult({});
    setShowResultModal(false);
  };

  return (
    <Box
      as="header"
      h="100%"
      minH="100%"
      d="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="white"
      backgroundImage={`url("https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGV0aGVyZXVtfGVufDB8fDB8fHww")`}
      backgroundSize="cover"
      backgroundPosition="center"
      textAlign="center"
    >
      <Flex
        alignItems="flex-start"
        justifyContent="space-between"
        marginTop="5rem"
      >
        <img
          className="image"
          height="40%"
          width="30%"
          src={arbitrum}
          alt="Arbitrum Logo"
        />

        <Flex
          flexDirection="column"
          alignItems={{ base: "flex-start", md: "flex-end" }}
        >
          <Heading
            as="h2"
            fontSize="2.7rem"
            marginTop="5rem"
            marginBottom="3rem"
            marginRight="30rem"
          >
            What is {currentRead}
          </Heading>

          <Text fontSize="1.2rem" marginRight="2rem" lineHeight="50px">
            {/* Description text */}
            Ethereum is a decentralized blockchain platform that enables
            developers to build and deploy smart contracts and decentralized
            applications (DApps). It was proposed by Vitalik Buterin in late
            2013 and development began in early 2014, with the network going
            live on July 30, 2015.Unlike Bitcoin, which primarily serves as a
            peer-to-peer electronic cash system, Ethereum aims to provide a more
            versatile platform for executing programmable, self-executing
            contracts. These smart contracts are written in Solidity, Ethereum's
            programming language, nd can be used to automate a wide range of
            processes, from financial transactions to supply chain management
            and decentralized finance (DeFi) applications.One of the key
            features of Ethereum is its ability to support decentralized
            applications, or DApps, which run on its blockchain network. DApps
            can be built for various purposes, such as decentralized finance
            (DeFi), non-fungible tokens (NFTs), gaming, social networks, and
            more. Ethereum also introduced the concept of the Ethereum Virtual
            Machine (EVM), a decentralized Turing-complete virtual machine that
            executes smart contracts on the Ethereum network. This allows
            developers to write code that runs on the blockchain, ensuring
            transparency, immutability, and security. Overall, Ethereum has
            become one of the most popular and widely used blockchain platforms,
            driving innovation in the blockchain and cryptocurrency space and
            paving the way for a new decentralized internet infrastructure.
          </Text>
          <Button
            className="btn"
            padding="1.5rem"
            colorScheme="blue"
            marginTop="5rem"
            marginRight="25rem"
            onClick={handleRefresh}
          >
            Earn more points
          </Button>
          <Button
            className="btn"
            padding="1.5rem"
            colorScheme="red"
            marginTop="2rem"
            marginRight="25rem"
            onClick={handleDeleteTotalPoints}
          >
            Delete Total Points
          </Button>
        </Flex>
      </Flex>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{currentRead}</h2>
            {QuizData.map((questionData, questionIndex) => (
              <div key={questionIndex}>
                <p>
                  {questionIndex + 1}. {questionData.question}
                </p>
                <ul>
                  {questionData.options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${questionIndex}`}
                          value={optionIndex}
                          onChange={() =>
                            handleAnswerChange(questionIndex, optionIndex)
                          }
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}

      {showResultModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Results</h2>
            <div>
              <p>Total Point: {totalScore}</p>
              <p>Total Questions Answered: {totalQuestionsAnswered}</p>{" "}
              {/* Display total questions answered */}
            </div>
            {Object.keys(quizResult).map((questionIndex) => (
              <div key={questionIndex}>
                <p>{QuizData[questionIndex].question}</p>
                <p
                  style={{ color: quizResult[questionIndex] ? "green" : "red" }}
                >
                  {quizResult[questionIndex] ? "Correct ✅" : "Incorrect ❌"}
                </p>
                <button>Check Point</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pass totalScore as props to the Dashboard */}
      <Dashboard totalPoints={totalScore} />
    </Box>
  );
};

export default Lisk;
