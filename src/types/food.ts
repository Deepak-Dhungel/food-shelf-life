export interface StorageInfo {
  unopened?: string;
  opened?: string;
  tip: string;
}

export interface Food {
  id: number;
  name: string;
  category: string;
  icon: string;
  pantry: StorageInfo | null;
  refrigerated: StorageInfo | null;
  frozen: StorageInfo | null;
  spoilSigns: string[];
}
