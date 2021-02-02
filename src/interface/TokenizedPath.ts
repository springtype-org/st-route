export interface TokenizedPath {
  regexp: RegExp;
  groups: { [name: string]: number };
}
