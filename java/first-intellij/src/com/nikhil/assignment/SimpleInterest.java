package com.nikhil.assignment;

import java.util.Scanner;

public class SimpleInterest {

    public static void main(String[] args) {
        System.out.println("What is the simpleInterest?");
        Scanner input = new Scanner(System.in);
        System.out.print("Enter the Principal: ");
        float principal = input.nextFloat();
        System.out.print("Enter the Interest: ");
        float interest = input.nextFloat();
        System.out.print("Enter the time: ");
        float time = input.nextFloat();
        double simpleInterest = (principal* interest* time)/100;
        String printSimpleInterest = Double.toString(simpleInterest);
        System.out.println("Interest : " + printSimpleInterest);
    }
}
