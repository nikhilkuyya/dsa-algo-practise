package com.nikhil.assignment;

import java.util.Scanner;

public class Palindrome {
    public static  void main(String[] args) {
        System.out.print("Enter String for Checking Palindrome: ");
        Scanner scanner = new Scanner(System.in);
        String input = scanner.next();
        int len = input.length();
        int diff = 0;
        for(int it = 0; it < len; it += 1) {
            char currentIndexChar = input.charAt(it);
            char reverseIndexChar = input.charAt(len - it - 1);
            diff += Math.abs(currentIndexChar - reverseIndexChar);
        }
        System.out.println("Is Palindrome : " + (diff == 0));
    }
}
