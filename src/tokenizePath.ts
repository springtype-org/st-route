import { TokenizedPath } from './interface/TokenizedPath';

interface RouteMatchGroups {
  [matchName: string]: number;
}

export const tokenizePath = (path: string): TokenizedPath => {
  const paramNameRegexp = new RegExp(':([^/.\\\\]+)', 'g');
  const groups: RouteMatchGroups = {};

  let newRegExp = path;
  let matches: RegExpExecArray | null = null;
  let i = 0;

  while ((matches = paramNameRegexp.exec(path))) {
    groups[matches[i]] = i++;
    newRegExp = newRegExp.replace(matches[0], '([^/.\\\\]+)');
  }
  newRegExp += '$';

  return {
    groups,
    regexp: new RegExp(newRegExp),
  };
};
