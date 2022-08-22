package app.tree.binarytree.binarysearchtree;

import app.tree.MyNode;
import app.utils.MyValidation;

public class MyBinarySearchTree {
    private MyNode rootNode;

    public MyBinarySearchTree() {
        this(null);
    }

    public MyBinarySearchTree(MyNode root) {
        this.setRootNode(root);
    }

    public MyNode getRootNode() {
        return this.rootNode;
    }

    public void setRootNode(MyNode rootNode) {
        this.rootNode = rootNode;
    }

    public boolean searchTree(int value) {
        boolean hasFound = false;
        MyNode iteratingNode = getRootNode();
        while (MyValidation.isNotNull(iteratingNode)) {
            if (iteratingNode.getData() == value) {
                hasFound = true;
                break;
            } else if (iteratingNode.getData() > value) {
                iteratingNode = iteratingNode.getLeftChild();
            } else {
                iteratingNode = iteratingNode.getRightChild();
            }
        }
        return hasFound;
    }

    public MyNode searchNodeInTree(int value) {
        MyNode iteratingNode = getRootNode();
        boolean hasFound = false;
        while (MyValidation.isNotNull(iteratingNode)) {
            if (iteratingNode.getData() == value) {
                hasFound = true;
                break;
            } else if (iteratingNode.getData() > value) {
                iteratingNode = iteratingNode.getLeftChild();
            } else {
                iteratingNode = iteratingNode.getRightChild();
            }
        }
        return hasFound ? iteratingNode : null;
    }

    public int countNodesInRange(int startIndex, int endIndex) {
        // int count = 0;
        // for (int it = startIndex; it < endIndex; it += 1) {
        // if (searchTree(it)) {
        // count += 1;
        // }
        // }
        // return count;
        return countNodesInRange(getRootNode(), startIndex, endIndex, 0);
    }

    public int countNodesInRange(MyNode node, int startRange, int endRange, int count) {

        if (node == null)
            return count;
        if (node != null) {
            if (node.getData() < startRange || node.getData() > endRange) {
                return 0;
            } else if (node.getData() >= startRange && node.getData() <= endRange) {
                return countNodesInRange(node.getLeftChild(), startRange, endRange, count)
                        + countNodesInRange(node.getRightChild(), startRange, endRange, count) + 1;
            }
        }
        return count;

    }

    public void addNode(int value) {
        MyNode iteratingNode = getRootNode();
        if (iteratingNode == null) {
            setRootNode(new MyNode(value));
            return;
        }

        while (MyValidation.isNotNull(iteratingNode)) {
            int nodeValue = iteratingNode.getData();
            if (nodeValue == value) {
                break;
            } else if (nodeValue > value) {
                if (MyValidation.isNotNull(iteratingNode.getLeftChild())) {
                    iteratingNode = iteratingNode.getLeftChild();
                } else {
                    iteratingNode.setLeftChild(new MyNode(value));
                }
            } else if (nodeValue < value) {
                if (MyValidation.isNotNull(iteratingNode.getRightChild())) {
                    iteratingNode = iteratingNode.getRightChild();
                } else {
                    iteratingNode.setRightChild(new MyNode(value));
                }
            }
        }
    }

    public MyNode largestNode(MyNode node) {
        MyNode iteratingNode = node;
        while (MyValidation.isNotNull(iteratingNode) && MyValidation.isNotNull(iteratingNode.getRightChild())) {
            iteratingNode = iteratingNode.getRightChild();
        }
        return iteratingNode;
    }

    // TODO : Setting the parent for new Node need to set.
    public void deleteNode(int value) {
        MyNode iteratingNode = getRootNode();
        if (iteratingNode == null) {
            return;
        }

        MyNode parentNode = iteratingNode;
        if (value == parentNode.getData()) {
            setRootNode(largestNode(parentNode.getLeftChild()));
        } else {
            while (MyValidation.isNotNull(iteratingNode)) {
                boolean isRight;
                parentNode = iteratingNode;
                int nodeValue = iteratingNode.getData();
                if (value > nodeValue) {
                    iteratingNode = iteratingNode.getRightChild();
                    isRight = true;
                } else {
                    isRight = false;
                    iteratingNode = iteratingNode.getLeftChild();
                }
                int checkValue = iteratingNode.getData();
                if (value == checkValue) {
                    deletNode(iteratingNode, isRight, parentNode);
                    break;
                }
            }
        }
    }

    // TODO: Connection Clean up.
    private void deletNode(MyNode node, boolean isRight, MyNode parentNode) {
        MyNode iteratingNode = node;
        MyNode setNode = null;
        if (MyValidation.isNull(iteratingNode.getLeftChild()) && MyValidation.isNull(iteratingNode.getRightChild())) {
            setNode = null;
        } else if (MyValidation.isNull(iteratingNode.getLeftChild())
                || MyValidation.isNull(iteratingNode.getRightChild())) {
            setNode = MyValidation.isNotNull(iteratingNode.getRightChild()) ? iteratingNode.getRightChild()
                    : iteratingNode.getLeftChild();

        } else {
            setNode = largestNode(iteratingNode.getLeftChild());
            setNode.setRightChild(node.getRightChild());
        }

        if (isRight) {
            parentNode.setRightChild(setNode);
        } else {
            parentNode.setLeftChild(setNode);
        }
    }

    public MyNode leastCommonAncestor(final int node1Value, final int node2Value) {
        MyNode iteratingNode = getRootNode();
        MyNode leastCommonAncestor = null;
        final int smallNodeValue = node1Value <= node2Value ? node1Value : node2Value;
        final int largerNodeValue = node2Value <= node1Value ? node1Value : node2Value;
        if (MyValidation.isNotNull(iteratingNode) && searchTree(smallNodeValue) && searchTree(largerNodeValue)) {
            if (smallNodeValue == largerNodeValue) {
                leastCommonAncestor = searchNodeInTree(node1Value);
            } else {
                while (MyValidation.isNotNull(iteratingNode)) {
                    int iteratingNodeValue = iteratingNode.getData();
                    boolean isParentGreater = iteratingNodeValue - smallNodeValue > 0
                            && iteratingNodeValue - largerNodeValue > 0;
                    boolean isParentLesser = iteratingNodeValue - smallNodeValue < 0
                            && iteratingNodeValue - largerNodeValue < 0;
                    boolean iterateCondition = isParentGreater || isParentLesser;

                    if (iterateCondition) {
                        iteratingNode = isParentGreater ? iteratingNode.getLeftChild() : iteratingNode.getRightChild();
                    } else {
                        if (iteratingNodeValue == smallNodeValue || iteratingNodeValue == largerNodeValue) {
                            leastCommonAncestor = iteratingNode;
                            break;
                        }
                        leastCommonAncestor = iteratingNode;
                        break;
                    }
                }
            }
        }
        return leastCommonAncestor;
    }

    // If posttraversal worked.
    // TODO :: Extend the tree or make a binaryTree from it.
    public MyNode modifyNodeToSumofRootNode(MyNode node, int accumulator) {
        if (node == null)
            return null;
        modifyNodeToSumofRootNode(node.getLeftChild(), accumulator);
        modifyNodeToSumofRootNode(node.getRightChild(), accumulator);
        node.setData((node.getData()) + (node.getLeftChild() != null ? node.getLeftChild().getData() : 0)
                + (node.getRightChild() != null ? node.getRightChild().getData() : 0));
        return node;

    }

    public MyNode balancedTree(int[] sortedArr, int startIndex, int endIndex) {
        if (startIndex > endIndex) {
            return null;
        }
        int mid = (startIndex + endIndex) / 2;
        MyNode newNode = new MyNode(sortedArr[mid]);

        newNode.setLeftChild(balancedTree(sortedArr, startIndex, mid - 1));
        newNode.setRightChild(balancedTree(sortedArr, mid + 1, endIndex));
        return newNode;
    }
}