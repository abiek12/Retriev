export interface FileLoader {
  load(filePath: string): Promise<any>;
}
