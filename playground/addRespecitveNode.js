const { getLinkedListFormatofNumber , getReverseLinkedListFormatofNumber } = require('./createLinkedListforNumber');

function getLinkedListforOperands(...operands){

  return operands.map(function(operand){
       return getReverseLinkedListFormatofNumber(operand);
  })
   

}

function addLinkedLists(linkedListOperands,carry = 0,resultantLinkedList = null){
   let result = addNodeofLinkedList(linkedListOperands,carry);
    
      resultantLinkedList = { value : result.value, next :
      resultantLinkedList};
      
     linkedListOperands = linkedListOperands.filter((operand) => operand !==
     null).map((operand) => operand.next); 
     const done = linkedListOperands.filter((operand) => operand !== null).length === 0;
   if(!done) {
     addLinkedLists(linkedListOperands,result.carry,resultantLinkedList);
   }
   return resultantLinkedList;   

}



function addNodeofLinkedList(linkedListOperands,carry){
   const validOperands = linkedListOperands.filter((operand) => {
    return operand !== null
   });
   
   
   const nodeSum = validOperands.reduce((sum,linkedListOperand) => {
        const  operand = linkedListOperand.value;
        return sum + operand;
    },carry);
  
  const { nodeValue , carryValue } = test(nodeSum);

   return { value : nodeValue, carry : carryValue }
}

function test(value){
    const divisorPower = value.toString().length; 
    const divisor = Math.pow(10,divisorPower-1);
    const digit = +(value/divisor).toString().split('.')[0];
    const num = divisor === 1 ? parseInt(value/10) : value%divisor;
    
    return { carryValue : num, nodeValue : digit};
}

addLinkedLists(getLinkedListforOperands(123,456));
