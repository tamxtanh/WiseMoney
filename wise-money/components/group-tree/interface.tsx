export interface CategoryTreeData {
  id: number;
  name: string;
  image_url: string;
}

export interface GroupTreeData {
  id: number;
  name: string;
  image_url: string;
  list: CategoryTreeData[];
}

export interface ItemTreeData {
  id: number;
  name: string;
  image_url: string;
  parent_category_id: number;
  children: ItemTreeData[];
}
