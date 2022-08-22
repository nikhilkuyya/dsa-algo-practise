package app.tree;

public enum MyDepthTraversalMode {
    PreOrder(1), InOrder(2), PostOrder(3);

    private final int traversalMode;

    public int getTreeTraversalMode() {
        return this.traversalMode;
    }

    MyDepthTraversalMode(int traversalMode) {
        this.traversalMode = traversalMode;
    }
}