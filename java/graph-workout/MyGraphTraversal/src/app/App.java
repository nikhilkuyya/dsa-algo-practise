package app;

import java.util.ArrayList;
import java.util.List;

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("Hello Java");
        setupMyEdgeListGraph();
    }

    public static void setSimpleGraph() {
        MySimpleGraphNode<Integer> a = new MySimpleGraphNode<Integer>(1);
        MySimpleGraphNode<Integer> b = new MySimpleGraphNode<Integer>(2);
        MySimpleGraphNode<Integer> c = new MySimpleGraphNode<Integer>(3);
        MySimpleGraphNode<Integer> d = new MySimpleGraphNode<Integer>(4);
        MySimpleGraphNode<Integer> e = new MySimpleGraphNode<Integer>(5);
        MySimpleGraphNode<Integer> f = new MySimpleGraphNode<Integer>(6);
        MySimpleGraphNode<Integer> g = new MySimpleGraphNode<Integer>(7);
        MySimpleGraphNode<Integer> h = new MySimpleGraphNode<Integer>(8);
        a.addNeighBour(b);
        a.addNeighBour(c);
        a.addNeighBour(d);
        c.addNeighBour(d);
        d.addNeighBour(b);
        c.addNeighBour(f);
        b.addNeighBour(e);
        e.addNeighBour(f);
        e.addNeighBour(h);
        f.addNeighBour(g);
        System.out.println(a.equals(b));
        MyGraph<Integer> graph = new MyGraph<Integer>();
        graph.setGraphStartingNode(a);
        // graph.depthFirstSearchByStack();
        // graph.breadthFirstSearchByQueue();
    }

    public static void setupMyEdgeListGraph() {
        MyGraphNode<Integer> a = new MyGraphNode<Integer>(1);
        MyGraphNode<Integer> c = new MyGraphNode<Integer>(3);
        MyGraphNode<Integer> b = new MyGraphNode<Integer>(2);
        MyGraphNode<Integer> d = new MyGraphNode<Integer>(4);
        MyGraphNode<Integer> e = new MyGraphNode<Integer>(5);
        // System.out.println(a.equals(a1));
        // System.out.println(a.equals(b));
        // System.out.println(a.equals(null));
        MyEdgeListGraph<Integer, MyGraphNode<Integer>, MyEdge<MyGraphNode<Integer>>> edgeListGraph = new MyEdgeListGraph<>();
        List<MyGraphNode<Integer>> myNodes = new ArrayList<>();

        myNodes.add(a);
        myNodes.add(b);
        myNodes.add(c);
        myNodes.add(d);
        myNodes.add(e);
        edgeListGraph.setNodes(myNodes);

        MyEdge<MyGraphNode<Integer>> abEdge = new MyEdge<>(a, b);
        MyEdge<MyGraphNode<Integer>> adEdge = new MyEdge<MyGraphNode<Integer>>(a, d);
        MyEdge<MyGraphNode<Integer>> aeEdge = new MyEdge<MyGraphNode<Integer>>(a, e);

        MyEdge<MyGraphNode<Integer>> bdEdge = new MyEdge<MyGraphNode<Integer>>(d, b);
        MyEdge<MyGraphNode<Integer>> dcEdge = new MyEdge<MyGraphNode<Integer>>(d, c);

        edgeListGraph.addEdge(abEdge);
        edgeListGraph.addEdge(adEdge);
        edgeListGraph.addEdge(bdEdge);
        edgeListGraph.addEdge(aeEdge);
        edgeListGraph.addEdge(dcEdge);

        // edgeListGraph.breadthFirstSearch();
        edgeListGraph.depthFirstSearch();
        ;

    }
}