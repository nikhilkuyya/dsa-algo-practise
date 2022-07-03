package com.nikhil;

import java.util.Scanner;

public class Basics {
    public static void main(String[] args) {
        int a = 10;
        if(a == 10.0){
            System.out.println("Hello Equal");
        }
        Scanner input = new Scanner(System.in);
        System.out.println( getTempeatureFarenheit(.nextFloat())));
    }

    public static  float getTempeatureFarenheit(float celsius){
        return (9/5)*celsius + 32;
    }
}
