function number2LinkedListDS(){
    
  
  
    function convertNumbertoLinkedListFormat(num,reverse){
      return recursiveNumber2LinkedList(+num,(reverse === 'false' ? false :
      !!reverse),null)  
    }

 
    function recursiveNumber2LinkedList(num,reverse,numberinLinkedListDS){
      let digit, divisor, divisorPower;      
      
      divisorPower = reverse ?  num.toString().length : 1;
            
      
      if(!reverse){
        
        divisor = Math.pow(10,divisorPower);
        digit = num%divisor;
        num  = parseInt(num/divisor); 
        
        numberinLinkedListDS = updateNode(numberinLinkedListDS, digit); 
        
      } else{
      
        divisor = Math.pow(10,divisorPower-1);
        digit = +(num/divisor).toString().split('.')[0];
        num = divisor === 1 ? parseInt(num/10) : num%divisor;
      
        numberinLinkedListDS = updateNode(numberinLinkedListDS, digit); 
      }
      
      
      
      if(num == 0){
        
        numberinLinkedListDS = numberinLinkedListDS === null ?
        updateNode(numberinLinkedListDS,digit) : numberinLinkedListDS;
      
      } else {
        numberinLinkedListDS = recursiveNumber2LinkedList(num,reverse,numberinLinkedListDS)
      }
      
      return numberinLinkedListDS;
    }
    
    function updateNode(linkedList, digit){
          const newNode =  { value : digit , next : null}
          newNode.next = linkedList;
          linkedList = newNode;
          return linkedList;
    }
    
    
    return  {
        getLinkedListFormatofNumber : convertNumbertoLinkedListFormat,
        getReverseLinkedListFormatofNumber : (input) => {
            return convertNumbertoLinkedListFormat(input,true);
        },
        getForwardLinkedListFormatofNumber : (input) => {
           return convertNumbertoLinkedListFormat(input,false);
        }
    }
    
}



module.exports = number2LinkedListDS();



