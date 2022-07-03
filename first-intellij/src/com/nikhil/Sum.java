package com.nikhil;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Sum {
    public static void main(String[] args) {
        File f = new File("/Users/nikhil-dev/code-learning/dsa-preparation/first-intellij/src/com/nikhil/test");
        try {
            Scanner input = new Scanner(f);
            int a = input.nextInt();
            int b = input.nextInt();
            System.out.println(a + b);
        }catch (FileNotFoundException ex) {
            System.out.println(ex.toString());
        }

    }
}
