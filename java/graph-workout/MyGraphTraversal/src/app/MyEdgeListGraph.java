package app;

import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

public class MyEdgeListGraph<T, V extends IMyNode<T>, E extends IMyEdge<V>> {
    private Set<V> nodes;
    private Set<E> edges;

    public MyEdgeListGraph() {
        this.nodes = new HashSet<V>();
        this.edges = new HashSet<E>();
    }

    public void addNode(V graphNode) {
        this.nodes.add(graphNode);
    }

    public void setNodes(List<V> nodes) {
        nodes.forEach(n -> {
            this.nodes.add(n);
        });
    }

    public void setEdges(List<E> edges) {
        edges.forEach(edge -> {
            this.edges.add(edge);
        });
    }

    public void addEdge(E newEdge) {
        this.edges.add(newEdge);
    }

    public boolean remove(E edge) {
        return this.edges.remove(edge);
    }

    public Iterator<V> getNodesIterator() {
        return this.nodes.iterator();
    }

    public Iterator<E> getEdgesIterator() {
        return this.edges.iterator();
    }

    public void breadthFirstSearch() {
        if (this.nodes.isEmpty() || this.edges.isEmpty()) {
            return;
        }
        V iteratingNode = getNodesIterator().next();

        Queue<V> verticesQueue = new LinkedList<V>();
        Set<V> visitedVertices = new HashSet<V>();

        verticesQueue.add(iteratingNode);
        visitedVertices.add(iteratingNode);

        while (!verticesQueue.isEmpty()) {
            V currentVertex = verticesQueue.remove();
            System.out.println(currentVertex);
            Iterator<E> edgeIterator = getEdgesIterator();

            while (edgeIterator.hasNext()) {
                E currentEdge = edgeIterator.next();
                V iteratingVertex = currentEdge.getStartNode();
                V endNode = currentEdge.getEndNode();
                if (iteratingVertex.equals(currentVertex) && !visitedVertices.contains(endNode)) {

                    visitedVertices.add(endNode);
                    verticesQueue.add(endNode);
                }
            }
        }

    }

    public void depthFirstSearch() {
        if (this.nodes.isEmpty() || this.edges.isEmpty()) {
            return;
        }
        V iteratingNode = getNodesIterator().next();
        Set<V> visitedVertices = new HashSet<>();
        visitedVertices.add(iteratingNode);

        depthFirstSearch(iteratingNode, visitedVertices);
    }

    private void depthFirstSearch(V vertex, Set<V> visitedVertices) {
        if (vertex == null) {
            return;
        }
        Iterator<E> edgeIterator = getEdgesIterator();
        System.out.println(vertex);
        while (edgeIterator.hasNext()) {
            E currentEdge = edgeIterator.next();
            V endVertex = currentEdge.getEndNode();
            V startVertex = currentEdge.getStartNode();
            if (startVertex.equals(vertex) && !visitedVertices.contains(endVertex)) {
                visitedVertices.add(endVertex);
                depthFirstSearch(endVertex, visitedVertices);
            }
        }
    }
}