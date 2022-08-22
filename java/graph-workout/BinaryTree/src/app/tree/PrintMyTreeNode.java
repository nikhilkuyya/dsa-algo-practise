package app.tree;

public class PrintMyTreeNode implements IMyTreeAction {

    public PrintMyTreeNode() {
    }

    public void printNodeData(MyNode node) {
        if (node != null) {
            System.out.print(node.getData() + ", ");
        }
    }

    public void execute(MyNode node) {
        printNodeData(node);
    }

}