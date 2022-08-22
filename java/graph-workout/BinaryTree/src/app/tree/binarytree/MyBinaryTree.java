package app.tree.binarytree;

import java.util.Queue;
import java.util.LinkedList;
import app.tree.*;

public class MyBinaryTree {
    private MyNode root;

    public MyBinaryTree(MyNode initialNode) {
        this.setRootNode(initialNode);
    }

    public MyBinaryTree() {
        this.setRootNode(null);
    }

    public MyNode getRootNode() {
        return this.root;
    }

    public void setRootNode(MyNode nodeValue) {
        this.root = nodeValue;
    }

    public int getTreeHeight() {
        if (this.root == null)
            return 0;
        return getNodeHeight(this.root);

    }

    public int getNodeHeight(MyNode node) {
        if (node == null) {
            return 0;
        }
        int leftNodeHeight = getNodeHeightHelper(node.getLeftChild()) + 1;
        int rightNodeHeight = getNodeHeightHelper(node.getRightChild()) + 1;
        return leftNodeHeight > rightNodeHeight ? leftNodeHeight : rightNodeHeight;
    }

    private int getNodeHeightHelper(MyNode myNode) {
        if (myNode == null)
            return 0;
        else {
            int leftNodeHeight = getNodeHeightHelper(myNode.getLeftChild()) + 1;
            int rightNodeHeight = getNodeHeightHelper(myNode.getRightChild()) + 1;
            return leftNodeHeight > rightNodeHeight ? leftNodeHeight : rightNodeHeight;
        }
    }

    // Traversal Methodology.
    public void depthFirstTraversal(MyNode referenceNode, IMyTreeAction treeAction,
            MyDepthTraversalMode traversalVariant) {
        depthFirstNodeTraversal(referenceNode, treeAction, traversalVariant);
    }

    private void depthFirstNodeTraversal(MyNode node, final IMyTreeAction treeAction,
            final MyDepthTraversalMode depthVariant) {

        if (node == null) {
            return;
        }
        if (MyDepthTraversalMode.PreOrder == depthVariant) {
            treeAction.execute(node);
        }
        depthFirstTraversal(node.getLeftChild(), treeAction, depthVariant);
        if (MyDepthTraversalMode.InOrder == depthVariant) {
            treeAction.execute(node);
        }
        depthFirstTraversal(node.getRightChild(), treeAction, depthVariant);
        if (MyDepthTraversalMode.PostOrder == depthVariant) {
            treeAction.execute(node);
        }
    }

    public void breadthFirstTraversal(MyNode referenceNode, IMyTreeAction treeAction,
            MyBreadthTraversalMode traversalMode) {
        if (traversalMode == MyBreadthTraversalMode.Iterative) {
            Queue<MyNode> queue = new LinkedList<MyNode>();
            queue.add(referenceNode);
            levelTraversalWithQueue(treeAction, queue);
        } else if (traversalMode == MyBreadthTraversalMode.Recursive) {
            levelTraversalIterative(referenceNode, treeAction);
        }

    }

    private void levelTraversalWithQueue(IMyTreeAction treeAction, Queue<MyNode> maintainTreeQueue) {

        while (!maintainTreeQueue.isEmpty()) {
            MyNode peekNode = maintainTreeQueue.peek();
            treeAction.execute(peekNode);
            maintainTreeQueue.remove();
            if (peekNode.getLeftChild() != null) {
                maintainTreeQueue.add(peekNode.getLeftChild());
            }
            if (peekNode.getRightChild() != null) {
                maintainTreeQueue.add(peekNode.getRightChild());
            }
        }
    }

    private void levelTraversalIterative(MyNode rootNode, IMyTreeAction treeAction) {
        final int treeHeight = this.getNodeHeight(this.getRootNode());
        for (int refLevel = 1; refLevel < treeHeight + 1; refLevel += 1) {
            printLevelNodeByIteration(rootNode, refLevel, 1, treeAction);
        }
    }

    private void printLevelNodeByIteration(MyNode currentNode, int lookupLevel, int currentLevel,
            IMyTreeAction treeAction) {

        if (currentNode == null) {
            return;
        } else if (lookupLevel == currentLevel) {
            treeAction.execute(currentNode);
        } else {
            printLevelNodeByIteration(currentNode.getLeftChild(), lookupLevel, currentLevel + 1, treeAction);
            printLevelNodeByIteration(currentNode.getRightChild(), lookupLevel, currentLevel + 1, treeAction);
        }
    }

    // staticHelpers
    public static void fullleftTraversal(MyNode rootNode) {
        MyNode tempNode = rootNode;
        if (rootNode != null) {
            while (tempNode != null) {
                System.out.println(tempNode.getData());
                tempNode = tempNode.getLeftChild();
            }
        }
    }

    public static void fullRightTraversal(MyNode rootNode) {
        MyNode tempNode = rootNode;
        if (rootNode != null) {
            while (tempNode != null) {
                System.out.println(tempNode.getData());
                tempNode = tempNode.getRightChild();
            }
        }
    }

    public static void fullTraversal(MyBinaryTree tree) {
        MyNode tempNode = tree.getRootNode();
        fullleftTraversal(tempNode);
        fullRightTraversal(tempNode);
    }
}