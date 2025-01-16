import React from "react";
import { View } from "react-native";
import { CategoryInterface } from "./CategoryInterface";

export class CategoryComposite implements CategoryInterface {
  private children: CategoryInterface[] = [];

  add(child: CategoryInterface): void {
    this.children.push(child);
  }

  remove(child: CategoryInterface): void {
    this.children = this.children.filter((c) => c !== child);
  }

  getChildren(): CategoryInterface[] {
    return this.children;
  }

  render(): React.ReactNode {
    return <View>{this.children.map((child) => child.render())}</View>;
  }
}
