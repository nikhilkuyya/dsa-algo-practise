package com.nikhil.assignment;

import java.util.Scanner;

public class ArmStrongNumber {
    public static  void main(String[] args){
        System.out.print("Enter Range of Number ");
        Scanner scanner = new Scanner(System.in);
        int firstInput = scanner.nextInt();
        int secondInput = scanner.nextInt();
        int maxValue = Integer.max(firstInput,secondInput);
        int minValue = Integer.min(firstInput,secondInput);
        int iterationValue = maxValue;
        while (iterationValue > minValue) {
            if(isArmStrongNumber(iterationValue)){
                System.out.println("ArmStrongNumber : " + iterationValue);
                return;
            }
            iterationValue -= 1;
        }

    }

    public static boolean isArmStrongNumber(int value) {
        String valueString = new String(Integer.toString(value));
        int length = valueString.length();
        int armStrongNumberCalc = 0;
        for(int it = 0; it < length; it += 1) {
         int indexVal = Character.digit(valueString.charAt(it),10);
         int basePowerofInteger = (int) Math.pow(indexVal,length);
         armStrongNumberCalc += basePowerofInteger;
        }
        return value == armStrongNumberCalc;
    }
}
