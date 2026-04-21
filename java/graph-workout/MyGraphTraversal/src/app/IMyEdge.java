package app;

public interface IMyEdge<V> {

    public void setStartNode(V startNode);

    public void setEndNode(V endNode);

    public void setWeight(int weight);

    public V getStartNode();

    public V getEndNode();

    public int getWeight();
}