package app;

import app.tree.*;
import app.tree.binarytree.*;
import app.tree.binarytree.binarysearchtree.*;
import app.utils.MyTester;
import app.utils.MyValidation;

public class App {
    public static void main(String[] args) {
        try {
            testBinarySearchTree();
        } catch (NullPointerException ex) {
            System.out.println(ex.getMessage());
            System.out.println(ex.getStackTrace());
        }
    }

    public static void testBinaryTree() {
        MyBinaryTree basicTree = new MyBinaryTree(new MyNode(10));
        MyNode rootNode = basicTree.getRootNode();
        if (rootNode != null) {
            rootNode.setLeftChild(new MyNode(5));
            rootNode.setRightChild(new MyNode(15));
            MyNode levelOneFirstChild = rootNode.getLeftChild();
            MyNode levelOneRightChild = rootNode.getRightChild();
            if (levelOneFirstChild != null) {
                levelOneFirstChild.setLeftChild(new MyNode(2));
                levelOneFirstChild.setRightChild(new MyNode(6));
            }
            if (levelOneRightChild != null) {
                levelOneRightChild.setLeftChild(new MyNode(12));
                levelOneRightChild.setRightChild(new MyNode(17));
            }
        }

        System.out.println("Depth First Search");
        basicTree.depthFirstTraversal(rootNode, new PrintMyTreeNode(), MyDepthTraversalMode.PreOrder);
        System.out.println();
        System.out.println("Breadth First Search");
        basicTree.breadthFirstTraversal(rootNode, new PrintMyTreeNode(), MyBreadthTraversalMode.Iterative);
        System.out.println();
        System.out.println(basicTree.getTreeHeight());
        System.out.println(basicTree.getNodeHeight(basicTree.getRootNode().getLeftChild().getLeftChild()));
        System.out.println(basicTree.getNodeHeight(null));
    }

    public static void testBinarySearchTree() throws NullPointerException {
        MyBinarySearchTree myBst = new MyBinarySearchTree(new MyNode(20));
        MyTester.tellMeIfWrong(MyValidation.isNotNull(myBst), true);

        if (MyValidation.isNotNull(myBst.getRootNode())) {
            setChildrenForNode(myBst.getRootNode(), 10, 30);
            MyNode levelOneLeftChild = myBst.getRootNode().getLeftChild();
            MyNode levelOneRightChild = myBst.getRootNode().getRightChild();
            if (MyValidation.isNotNull(levelOneLeftChild)) {
                setChildrenForNode(levelOneLeftChild, 5, 15);
            }
            if (MyValidation.isNotNull(levelOneRightChild)) {
                setChildrenForNode(levelOneRightChild, 25, 35);
            }
        }

        // search Input.
        MyTester.tellMeIfWrong(myBst.searchTree(20), true);
        MyTester.tellMeIfWrong(myBst.searchTree(5), true);
        MyTester.tellMeIfWrong(myBst.searchTree(15), true);
        MyTester.tellMeIfWrong(myBst.searchTree(25), true);
        MyTester.tellMeIfWrong(myBst.searchTree(12), false);

        // search Range Matches Count.
        MyTester.tellMeIfWrong(myBst.countNodesInRange(1, 100), 7);

        // addNode
        MyTester.tellMeIfWrong(myBst.searchTree(100), false);
        myBst.addNode(100);
        MyTester.tellMeIfWrong(myBst.searchTree(100), true);
        myBst.addNode(27);
        myBst.addNode(1);

        // remvoeNode
        // MyTester.tellMeIfWrong(myBst.searchTree(10), true);
        // myBst.deleteNode(10);
        // MyTester.tellMeIfWrong(myBst.searchTree(10), false);
        MyBinaryTree tree = new MyBinaryTree();
        tree.setRootNode(myBst.getRootNode());
        tree.depthFirstTraversal(tree.getRootNode(), new PrintMyTreeNode(), MyDepthTraversalMode.InOrder);
        System.out.println();

        MyTester.tellMeIfWrong(MyValidation.isNotNull(myBst.leastCommonAncestor(1, 100)), true);
        MyTester.tellMeIfWrong(MyValidation.isNotNull(myBst.leastCommonAncestor(27, 100)), true);
        MyTester.tellMeIfWrong(myBst.leastCommonAncestor(27, 100).getData(), 30);
        MyTester.tellMeIfWrong(myBst.leastCommonAncestor(1, 100).getData(), 20);
        MyTester.tellMeIfWrong(MyValidation.isNotNull(myBst.leastCommonAncestor(1, 5)), true);
        MyTester.tellMeIfWrong(myBst.leastCommonAncestor(1, 5).getData(), 5);
        MyTester.tellMeIfWrong(myBst.leastCommonAncestor(1, 15).getData(), 10);
        MyTester.tellMeIfWrong(myBst.leastCommonAncestor(25, 27).getData(), 25);

        MyNode newRootNode = myBst.modifyNodeToSumofRootNode(myBst.getRootNode(), 0);
        // MyBinarySearchTree mbst = new MyBinarySearchTree(newRootNode);
        MyBinaryTree mbt = new MyBinaryTree(newRootNode);
        mbt.depthFirstTraversal(mbt.getRootNode(), new PrintMyTreeNode(), MyDepthTraversalMode.InOrder);
        System.out.println();
        MyBinaryTree tree1 = new MyBinaryTree();
        tree1.setRootNode(myBst.getRootNode());
        tree1.depthFirstTraversal(tree1.getRootNode(), new PrintMyTreeNode(), MyDepthTraversalMode.InOrder);
        System.out.println();
        // myBst.deleteNode(100);
        // tree.setRootNode(myBst.getRootNode());
        // tree.depthFirstTraversal(tree.getRootNode(), new PrintMyTreeNode(),
        // MyDepthTraversalMode.InOrder);
        // System.out.println();

    }

    public static void setChildrenForNode(MyNode node, int leftChildValue, int rightChildValue) {
        node.setLeftChild(new MyNode(leftChildValue));
        node.setRightChild(new MyNode(rightChildValue));
    }
}