package app;

import java.util.ArrayList;
import java.util.List;

public class MyGraphNode<T> implements IMyNode<T> {

    private T nodeValue;

    public MyGraphNode(T nodeValue) {
        this.setNodeValue(nodeValue);
    }

    public T getNodeValue() {
        return this.nodeValue;
    }

    public void setNodeValue(T nodeValue) {
        this.nodeValue = nodeValue;
    }

    @SuppressWarnings(value = "unchecked")
    public boolean equals(Object anotherGraphNode) {
        if (anotherGraphNode instanceof MyGraphNode) {
            MyGraphNode<T> inputObj = (MyGraphNode<T>) anotherGraphNode;
            return this.getNodeValue().equals(inputObj.getNodeValue());
        }
        return false;
    }

    public String toString() {
        return getNodeValue().toString();
    }

}