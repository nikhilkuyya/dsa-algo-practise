package app;

import java.io.UncheckedIOException;
import java.util.ArrayList;
import java.util.List;

public class MySimpleGraphNode<T> {

    // private String id;
    private T nodeValue;
    private List<MySimpleGraphNode<T>> neighbours;
    private boolean visited;

    public MySimpleGraphNode(T nodeValue) {
        this.setNodeValue(nodeValue);
        this.neighbours = new ArrayList<MySimpleGraphNode<T>>();
    }

    public T getNodeValue() {
        return this.nodeValue;
    }

    public void setNodeValue(T nodeValue) {
        this.nodeValue = nodeValue;
    }

    public void addNeighBour(MySimpleGraphNode<T> neighbour) {
        this.neighbours.add(neighbour);
    }

    public List<MySimpleGraphNode<T>> getNeighbours() {
        return this.neighbours;
    }

    public void setVisited() {
        this.visited = true;
    }

    public boolean hasVisited() {
        return this.visited;
    }

    @SuppressWarnings(value = "unchecked")
    public boolean equals(Object anotherGraphNode) {
        if (!(anotherGraphNode instanceof MySimpleGraphNode)) {
            return false;
        }
        if (anotherGraphNode != null) {
            Boolean res = false;
            try {
                MySimpleGraphNode<T> inputObject = (MySimpleGraphNode<T>) anotherGraphNode;
                res = this.getNodeValue().equals(inputObject.getNodeValue());
            } catch (Exception ex) {
                res = false;
            } finally {

            }
            return res;
        }
        return false;

    }

}