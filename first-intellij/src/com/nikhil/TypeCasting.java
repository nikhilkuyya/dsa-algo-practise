package com.nikhil;

public class TypeCasting {
    public static void main(String[] args) {
        byte a = 10;
        byte b = 20;
        byte c = 2;
        // d byte shows error, because byte are converted to int
        int d = (a * b )/ (c);

        //
        float x = 23.34f;
        // if any of above the int, it will result type of higher type
        float e = x + d;


    }
}
