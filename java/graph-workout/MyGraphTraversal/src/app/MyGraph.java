package app;

import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;
import java.util.Stack;

public class MyGraph<T> {

    private MySimpleGraphNode<T> startingNode;

    public MyGraph() {
        setGraphStartingNode(null);
    }

    public MyGraph(MySimpleGraphNode<T> node) {
        setGraphStartingNode(node);
    }

    public void setGraphStartingNode(MySimpleGraphNode<T> startNode) {
        this.startingNode = startNode;
    }

    public void depthFirstSearch() {
        depthFirstSearch(startingNode, new HashSet<MySimpleGraphNode<T>>());
    }

    public void depthFirstSearch(MySimpleGraphNode<T> node, Set<MySimpleGraphNode<T>> visitedNodes) {
        if (node == null) {
            return;
        }
        visitedNodes.add(node);
        node.getNeighbours().forEach((n) -> {
            if (n == startingNode || visitedNodes.contains(n)) {
                return;
            }
            depthFirstSearch(n, visitedNodes);
        });
        System.out.println(node.getNodeValue());

    }

    public void depthFirstSearchByStack() {
        Stack<MySimpleGraphNode<T>> stack = new Stack<>();
        MySimpleGraphNode<T> iteratingNode = startingNode;
        Set<MySimpleGraphNode<T>> visitedNodes = new HashSet<>();
        if (iteratingNode == null) {
            return;
        } else {
            stack.add(iteratingNode);
        }

        while (!stack.isEmpty()) {
            MySimpleGraphNode<T> topNode = stack.pop();
            System.out.println(topNode.getNodeValue());
            topNode.getNeighbours().forEach(n -> {
                if (!visitedNodes.contains(n)) {
                    visitedNodes.add(n);
                    stack.add(n);
                }
            });
        }

    }

    public void breadthFirstSearchByQueue() {

        Queue<MySimpleGraphNode<T>> queue = new LinkedList<>();
        MySimpleGraphNode<T> iteratingNode = startingNode;
        Set<MySimpleGraphNode<T>> visitedNodes = new HashSet<>();

        visitedNodes.add(iteratingNode);
        queue.add(iteratingNode);

        while (!queue.isEmpty()) {
            MySimpleGraphNode<T> topElement = queue.remove();

            Iterator<MySimpleGraphNode<T>> neighBourIterator = topElement.getNeighbours().iterator();
            while (neighBourIterator.hasNext()) {
                MySimpleGraphNode<T> temp = neighBourIterator.next();
                if (!visitedNodes.contains(temp)) {

                    queue.add(temp);
                    visitedNodes.add(temp);

                }
            }

            System.out.println(topElement.getNodeValue());
        }
    }

}
