import React, { useState, useEffect } from 'react';
import TextButton from './TextButton';

const GameLayout = () => {
  const [target, setTarget] = useState(0);
  const [result, setResult] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [operations, setOperations] = useState(['+', '−', '×', '÷']);
  const [hiddenButtons, setHiddenButtons] = useState({});
  const [lastValue, setLastValue] = useState(null);
  const [currentOperation, setCurrentOperation] = useState(null);
  const [checkmark, setCheckmark] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(true);

  useEffect(() => {
    generateTarget();
  }, []);

  const generateTarget = () => {
    const nums = Array.from({ length: 4 }, (_, index) => ({
      id: index,
      value: Math.floor(Math.random() * 9 + 1),
    }));
    const ops = ['+', '−', '×'];

    // Create a copy shuffled version of the numbers and operations
    const shuffledNums = [...nums].sort(() => Math.random() - 0.5);
    const shuffledOps = [...ops].sort(() => Math.random() - 0.5);

    console.log(shuffledNums);
    console.log(shuffledOps);

    // Apply the shuffled operations to the shuffled numbers in stack order
    const initialResult = shuffledNums[0].value;
    const target = shuffledNums.slice(1).reduce((acc, num, index) => {
      const op = shuffledOps[index];
      switch (op) {
        case '+':
          return acc + num.value;
        case '−':
          return acc - num.value;
        case '×':
          return acc * num.value;
        case '÷':
          return acc / num.value;
        default:
          return acc;
      }
    }
    , initialResult);
    setNumbers(nums);
    setOperations(ops);
    setTarget(target);
    setResult(null); // Start with no result displayed
    setHiddenButtons({});
    setLastValue(null);
    setCurrentOperation(null);
    setCheckmark(false);
  };

  const handleButtonClick = (value, id) => {
    console.log("Button clicked:", value);

    const isNumber = !isNaN(value);
    const isOperation = operations.includes(value);

    if (isNumber && !numberAllowed) {
      console.log("Number input not allowed, skipping...");
      return;
    }

    if (isOperation && numberAllowed) {
      console.log("Operation input not allowed, skipping...");
      return;
    }

    setNumberAllowed(!numberAllowed);

    if (isNumber && currentOperation) {
      console.log("Applying operation:", currentOperation, "to result:", result, "with number:", value);

      let newResult;
      switch (currentOperation) {
        case '+':
          newResult = result + value;
          break;
        case '−':
          newResult = result - value;
          break;
        case '×':
          newResult = result * value;
          break;
        case '÷':
          newResult = result / value;
          break;
        default:
          newResult = result;
          break;
      }

      setResult(newResult);
      setHiddenButtons({ ...hiddenButtons, [id]: true });
      setLastValue(value);
      setCurrentOperation(null);
    } else if (isNumber && currentOperation === null) {
      // First input case, just set the result to the clicked number
      console.log("First number input:", value);
      setResult(value);
      setHiddenButtons({ ...hiddenButtons, [id]: true });
      setLastValue(value);
    }

    if (isOperation && lastValue !== null) {
      console.log("Setting operation:", value);
      setCurrentOperation(value);
      setHiddenButtons({ ...hiddenButtons, [id]: true });
    }

    // Check if all numbers have been used
    const remainingNumbers = numbers.filter(num => !hiddenButtons[num.id]);
    const remainingOperations = operations.filter(op => !hiddenButtons[op]);


    console.log(remainingNumbers)
    if (remainingNumbers.length === 1 && isNumber) {
      setCheckmark(true); // Show checkmark when one operation remains and all numbers are used
    }
  };

  const handleCheckmarkClick = () => {
    console.log("End button clicked");

    // Check if they got the target number
    const correct = result === target;

    if (correct) {
      console.log("Correct!");
    } else {
      console.log("Incorrect!");
    }

    // If they got it correct, generate a new target. Otherwise, keep the same target
    // Either way, reset the game state

    if (correct) {
      generateTarget();
    }

    // Show all buttons
    setHiddenButtons({});
    // Reset the result
    setResult(null);
    // Reset the last value
    setLastValue(null);
    // Reset the current operation
    setCurrentOperation(null);
    // Reset the checkmark state
    setCheckmark(false);

    // Reset the number allowed state
    setNumberAllowed(true);
  };

  return (
    <div className="w-full flex flex-col justify-between h-full min-h-screen">
      {/* Top Container: Target Number */}
      <div className="p-4 pb-0 mt-8 text-white text-center font-bold text-7xl">
        {target}
      </div>

      {/* Middle Container: Running Tally */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="p-4 pb-0 text-center text-white text-5xl">
          {result !== null ? result : ""}
        </div>
      </div>

      {/* Bottom Container: Buttons */}
      <div className="w-full mx-auto p-2 sm:p-4">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-4 sm:gap-4">
          {numbers.map(num => (
            <TextButton
              key={num.id}
              text={num.value}
              onClick={() => handleButtonClick(num.value, num.id)}
              hidden={hiddenButtons[num.id]}
            />
          ))}
          {operations.map(op => (
            <TextButton
              key={op}
              text={op}
              onClick={() => handleButtonClick(op, op)}
              hidden={hiddenButtons[op]}
            />
          ))}
          {true ? (
            <TextButton
              key="checkmark"
              text={(result === target) && checkmark ? "✔" : "✘"}
              onClick={handleCheckmarkClick}
              hidden={false}
            />
          ) : (
            <TextButton 
              key='checkmark'
              text=''
            />
          )
        
        
        }
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
