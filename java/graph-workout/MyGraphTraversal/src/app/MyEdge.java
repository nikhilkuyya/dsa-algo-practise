package app;

public class MyEdge<V> implements IMyEdge<V> {

    private V startNode;
    private V endNode;
    private int weight;

    public MyEdge(V startNode, V endNode) {
        this(startNode, endNode, 1);
    }

    public MyEdge(V startNode, V endNode, int weight) {
        setStartNode(startNode);
        setEndNode(endNode);
        setWeight(weight);
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public V getEndNode() {
        return endNode;
    }

    public void setEndNode(V endNode) {
        this.endNode = endNode;
    }

    public V getStartNode() {
        return startNode;
    }

    public void setStartNode(V startNode) {
        this.startNode = startNode;
    }

}