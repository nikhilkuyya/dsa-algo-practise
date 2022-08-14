package com.nikhil.assignment;

import java.util.InputMismatchException;
import java.util.Scanner;

public class SimpleOperation {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        double inputA = Double.NaN, inputB = Double.NaN;
        String operation = new String("");
        try {
            inputA = input.nextDouble();
            inputB = input.nextDouble();
            operation = input.next();
            System.out.println("inputA : " + inputA + " inputB " + inputB + " Operation " + operation);
        }catch (InputMismatchException ex) {
            System.out.println("Invalid Input " + ex.getMessage());
            return;
        }
        double result = Double.NaN;
        boolean isSuccess = false;
        if(operation.equals("+")){
            result = inputA + inputB;
            isSuccess = true;
        }else if(operation.equals("-")){
            result = inputA - inputB;
            isSuccess = true;
        }else if(operation.equals("*")){
            result = inputA * inputB;
            isSuccess = true;
        }else if(operation.equals("/")){
            try {
                result  = inputA/inputB;
                isSuccess = true;
            }catch (ArithmeticException ex){
                System.out.println("Failed with " + ex.getMessage());
            }
        }else {
            isSuccess = false;
        }
        if(isSuccess) {
            System.out.println("Result: " + result);
        }else {
            System.out.println("Not Supported Operation");
        }
    }
}
