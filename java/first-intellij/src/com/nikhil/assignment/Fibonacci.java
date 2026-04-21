package com.nikhil.assignment;

import java.util.Scanner;

public class Fibonacci {

    public static void main(String[] args){
        System.out.println("Enter the nth Fib");
        Scanner input = new Scanner(System.in);
        int fib = input.nextInt();
        int value = getFibonacci(fib);
        System.out.println("output "+ value);
    }

    private static int getFibonacci(int fib) {
        int previous = 1;
        int previousPrevious = 0;
        int value = Integer.MIN_VALUE;

        for(int it = 0; it < fib; it += 1) {
            if(it == 0) {
                value = previousPrevious;
            }else if(it == 1){
                value = previous;
            }else {
                value = previous + previousPrevious;
                previousPrevious = previous;
                previous = value;
            }
            System.out.print(value + (it + 1== fib ? ". ": ", "));
        }
        return value;
    }
}
