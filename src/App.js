import React,{ useState } from 'react';
import './App.css';







function App() {

  const [count, setCount] = useState('');
  const [error,setError]=useState('');
  const [answer,setAnswer]=useState(0);
  
  const inputHandler=(val) => {
    
    setCount(count+val);
  };

  const resetHandler=(val)=>{
    setCount('');
    setAnswer('');
  }
  
  function evaluate(){
    /* Javascript implementation to convert
    infix expression to postfix*/
    
    //Function to return precedence of operators
    
    setError('');

    function prec(c) {
      if(c === '^')
          return 3;
      else if(c === '/' || c==='*')
          return 2;
      else if(c === '+' || c === '-')
          return 1;
      else
          return -1;
  }

  // The main function to convert infix expression
  //to postfix expression
  function infixToPostfix(s) {
    let st = []; // For stack operations, using JavaScript built-in stack
    let result = "";
    let i = 0;
  
    while (i < s.length) {
      let c = s[i];
  
      // If the scanned character is a digit, capture the whole number
      if (c >= '0' && c <= '9') {
        let num = "";
        // Continue to capture the number until we hit a non-digit
        while (i < s.length && s[i] >= '0' && s[i] <= '9') {
          num += s[i];
          i++;
        }
        result += num + " ";  // Add space to separate operands in result
        continue;
      }
      
      // If the scanned character is an operand (letters)
      if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
        result += c + " ";
      }
      
      // If the scanned character is an ‘(‘, push it to the stack
      else if (c === '(') {
        st.push('(');
      }
  
      // If the scanned character is an ‘)’, pop to output until ‘(‘ is encountered
      else if (c === ')') {
        while (st.length && st[st.length - 1] !== '(') {
          result += st.pop() + " ";
        }
        st.pop(); // Remove '('
      }
  
      // If an operator is scanned
      else {
        while (st.length !== 0 && prec(c) <= prec(st[st.length - 1])) {
          result += st.pop() + " ";
        }
        st.push(c);
      }
      i++;
    }
  
    // Pop all the remaining elements from the stack
    while (st.length !== 0) {
      result += st.pop() + " ";
    }
  
    return result.trim(); // Trim any trailing spaces
  }
  

  
  
  
  
  
  // Evaluate Postfix
  function evaluatePostfix(exp) {
    // Create a stack
    let stack = [];
  
    // Split the expression by spaces to handle multi-digit numbers
    const tokens = exp.split(' ');
  
    // Scan each token one by one
    for (let i = 0; i < tokens.length; i++) {
      let token = tokens[i];
      
      // If the scanned token is a number, push it to the stack
      if (!isNaN(parseInt(token))) {
        stack.push(parseInt(token));
      } else {
        // The token is an operator, pop two elements from the stack and apply the operator
        let val1 = stack.pop();
        let val2 = stack.pop();
  
        switch (token) {
          case '+':
            stack.push(val2 + val1);
            break;
          case '-':
            stack.push(val2 - val1);
            break;
          case '/':
            stack.push(val2 / val1);
            break;
          case '*':
            stack.push(val2 * val1);
            break;
          case '^':
            stack.push(val2 ** val1);  // For exponentiation
            break;
          default:
            setAnswer('Error please enter correct expression');;
        }
      }
    }
  
    // The result is the last element in the stack
    return stack.pop();
  }
  
  
  
  
  
  
  
  
  
  let exp = count;
  let ans='';
  let infix='';
  infix=infixToPostfix(exp);
  console.log(infix);
  ans=evaluatePostfix(infix)


  console.log(`ans ${ans}`);
  setCount(count);
  if(isNaN(ans)){
    setAnswer('Error please enter correct expression');
  }
  else{
    setAnswer(ans);
  }
  setCount('');
  return;


  }





  return (
    <>
      <h1>CALCULATOR</h1>
      <input type="text" onChange={(e) => setCount(e.target.value)} placeholder="Enter your expression" value={count} className="input-display"/>
      <div className="buttons">
        <button className='number' onClick={() =>inputHandler('1')} onChange={(e) => setCount(e.target.value)} value={count}>1</button>
        <button className='number' onClick={() =>inputHandler('2')}>2</button>
        <button className='number' onClick={() =>inputHandler('3')}>3</button>
        <button className='number' onClick={() =>inputHandler('4')}>4</button>
        <button className='number' onClick={() =>inputHandler('5')}>5</button>
        <button className='number' onClick={() =>inputHandler('6')}>6</button>
        <button className='number' onClick={() =>inputHandler('7')}>7</button>
        <button className='number' onClick={() =>inputHandler('8')}>8</button>
        <button className='number' onClick={() =>inputHandler('9')}>9</button>
        <button className='number' onClick={() =>inputHandler('(')}>(</button>
        <button className='number' onClick={() =>inputHandler('0')}>0</button>
        <button className='number' onClick={() =>inputHandler(')')}>)</button>
        <button className='op' onClick={() =>inputHandler('+')}>+</button>
        <button className='reset' onClick={() =>resetHandler('')}>Reset</button>
        <button className='op' onClick={() =>inputHandler('-')}>-</button>
        <button className='op' onClick={() =>inputHandler('*')}>x</button>
        <button className='op' onClick={() =>inputHandler('^')}>^</button>
        <button className='op' onClick={() =>inputHandler('/')}>/</button>
      </div>
      <button className="eval-button" onClick={evaluate}>Evaluate</button>
      
      <p className="output">{answer}</p>
      <p className="error">{error}</p>
    </>
  );
  
}

export default App;
