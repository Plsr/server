export function parseRequestHeaders(data: Buffer) {
  const lines = [];
  let currLine = [];
  let skipNext = false;

  for (let i = 0; i < data.length; i++) {
    if (skipNext) {
      skipNext = false;
      continue;
    }

    const currVal = data[i];

    if (currVal === 13 && data[i + 1] === 10) {
      lines.push(currLine);
      currLine = [];
      skipNext = true;
      continue;
    }

    currLine.push(currVal);
  }

  return lines;
}
