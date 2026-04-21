package com.nikhil.assignment;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class InputOddOrEven {

    public static void main(String[] args){
        System.out.println("Hello, Enter input ");
        String path = "src/com/nikhil/assignment/input-odd-or-even";
        String currentFilePath = new File(path).getAbsolutePath();
        File file = new File(currentFilePath);
        System.out.println(currentFilePath);
        try {
            Scanner input = new Scanner(file);
            while(input.hasNext()) {
                int currentInput = input.nextInt();
                System.out.println("Input " + currentInput + " is " + (currentInput%2 == 0 ? "Even" : "Odd"));
            }
        }catch (FileNotFoundException fex) {
            System.err.println(fex.getMessage());
        }
    }
}
