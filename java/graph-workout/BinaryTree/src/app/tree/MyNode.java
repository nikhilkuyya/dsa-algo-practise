package app.tree;

public class MyNode {
    private Integer data;
    private MyNode left;
    private MyNode right;

    public MyNode(Integer data) {
        this.setData(data);
        this.setLeftChild(null);
        this.setRightChild(null);
    }

    public Integer getData() {
        return this.data;
    }

    public void setData(Integer value) {
        this.data = value;
    }

    public MyNode getLeftChild() {
        return this.left;
    }

    public MyNode getRightChild() {
        return this.right;
    }

    public void setLeftChild(MyNode newNodeValue) {
        this.left = newNodeValue;
    }

    public void setRightChild(MyNode newNodeValue) {
        this.right = newNodeValue;
    }

}