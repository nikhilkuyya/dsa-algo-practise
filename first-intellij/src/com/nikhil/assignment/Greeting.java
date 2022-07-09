package com.nikhil.assignment;

import java.util.Scanner;

public class Greeting {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter Name: ");
        String greeter = input.next();
        System.out.println("Good Morning " + greeter);
    }
}
