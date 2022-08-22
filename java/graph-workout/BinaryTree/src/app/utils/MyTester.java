package app.utils;

public abstract class MyTester {

    public static boolean test(Object src, Object dest) {
        return src == dest;
    }

    public static void outputTest(Object src, Object dest) {
        MyCustomOutput.simpleOutput(test(src, dest));
    }

    public static void tellMeIfWrong(Object src, Object dest) {
        if (src != dest) {
            System.out.println("input is returning " + src + "but requiredValue is " + dest);
        }
    }

}
