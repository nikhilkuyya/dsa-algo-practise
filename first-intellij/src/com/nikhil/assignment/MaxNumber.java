package com.nikhil.assignment;

import java.util.InputMismatchException;
import java.util.Scanner;

public class MaxNumber {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("Enter two doubles ");
        Double a = Double.NaN, b = Double.NaN;
        try{
            a = input.nextDouble();
            b = input.nextDouble();
        }catch (InputMismatchException ex){
            System.out.println("Input Mismatch "+ ex.getMessage());
            return;
        }
        System.out.println("OutMax "+ Double.max(a,b));
    }
}
