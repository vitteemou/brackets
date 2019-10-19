module.exports = function check(str, bracketsConfig) {
  const openingBrackets = [];
  const closingBrackets = [];
  const bracketsPairs = new Map();
  let stack = [];

  return isStringValid(str, bracketsConfig);

  function isStringValid (str, bracketsConfig) {

    bracketsConfig.forEach(configArray => {
      openingBrackets.push(configArray[0]);
      closingBrackets.push(configArray[1]);
      bracketsPairs.set(configArray[0], configArray[1]);
    }); 

    let sameBracketsCountMap = new Map();
    for(let i = 0; i < str.length; i++) {
      let curBracket = str[i];

      if(!isOpening(curBracket) && !isClosing(curBracket)) {
        return false;
      }

      if(isOpening(curBracket) && isClosing(curBracket)) {
        if(sameBracketsCountMap.has(curBracket)) {
          let bracketsCount = sameBracketsCountMap.get(curBracket);
          sameBracketsCountMap.set(curBracket, +!bracketsCount);
        }
        else {
          sameBracketsCountMap.set(curBracket, 0);
        }
      }
      
      let isClosingSameBracket = (sameBracketsCountMap.has(curBracket) && sameBracketsCountMap.get(curBracket) === 1);
      if((isClosing(curBracket) && !isOpening(curBracket)) || isClosingSameBracket) {
        let lastOpeningBracket = stack[stack.length - 1];
        let isValidClosingBracket = (bracketsPairs.get(lastOpeningBracket) === curBracket);
       
        if(!isValidClosingBracket) {
          return false;
        }
        stack.pop();
        continue;
      }

      let isOpeningSameBracket = (sameBracketsCountMap.has(curBracket) && sameBracketsCountMap.get(curBracket) === 0);
      if(isOpening(curBracket) || isOpeningSameBracket) {
        stack.push(curBracket);
      }
    }
    return (stack.length === 0);
  }

  function isOpening(bracket) {
    return openingBrackets.includes(bracket);
  }
  
  function isClosing(bracket) {
    return closingBrackets.includes(bracket);
  }
}
