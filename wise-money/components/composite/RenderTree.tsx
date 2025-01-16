import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CategoryComposite } from "./CategoryComposite";
import { CategoryInterface } from "./CategoryInterface";
import { CategoryLeaf } from "./CategoryLeaf";

interface RenderTreeProps {
  data: any[]; // Flat array of data with id, name, url, and parent_id
  handlePress?: (item: CategoryInterface) => void;
}

const RenderTree: React.FC<RenderTreeProps> = ({ data, handlePress }) => {
  // Helper function to build the tree
  const buildTree = (data: any[]): CategoryComposite => {
    const rootComposite = new CategoryComposite(); // Root composite containing all categories

    // Helper function to recursively find or create a parent composite
    const findOrCreateComposite = (
      parentId: number | null
    ): CategoryComposite => {
      if (parentId === null) {
        return rootComposite; // Root categories go directly under rootComposite
      }

      // Find the parent composite within rootComposite's children
      let parentComposite = rootComposite
        .getChildren()
        .find(
          (child) =>
            child instanceof CategoryComposite && (child as any).id === parentId
        ) as CategoryComposite;

      if (!parentComposite) {
        parentComposite = new CategoryComposite();
        (parentComposite as any).id = parentId; // Assign an ID for reference
        rootComposite.add(parentComposite);
      }

      return parentComposite;
    };

    // Process each category in the data
    data.forEach((category) => {
      const { id, name, url, parent_id } = category;

      const currentNode = new CategoryLeaf(id, name, url);

      // Find or create the parent composite and add the current node to it
      const parentComposite = findOrCreateComposite(parent_id);
      parentComposite.add(currentNode);
    });

    return rootComposite;
  };

  // Build the tree structure
  const tree = buildTree(data);

  // Recursive rendering
  const renderTree = (node: CategoryInterface) => (
    <TouchableOpacity onPress={() => handlePress && handlePress(node)}>
      {node.render()}
    </TouchableOpacity>
  );

  return <View style={styles.treeContainer}>{renderTree(tree)}</View>;
};

const styles = StyleSheet.create({
  treeContainer: {
    padding: 10,
  },
});

export default RenderTree;
