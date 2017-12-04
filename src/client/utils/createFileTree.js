const getRelativePathAsSplitArray = (filePath, relativePath) => {
  let pathArray = filePath.split("/");
  const idx = pathArray.findIndex(el => el === relativePath);
  pathArray = pathArray.slice(idx).slice(1);
  return pathArray.filter(
    el => !el.includes(".git") || !el.includes("node_modules")
  );
};

const findParentIndex = (layer, parent) => {
  const parentIndex = layer.findIndex(element => element.module === parent);
  if (parentIndex === -1) {
    throw new Error("Could not find parent...");
  }
  return parentIndex;
};

const generateRelativePathArrAndGetDeepestNestedFile = (
  dirArr,
  relativePath
) => {
  const pathArray = dirArr.map(filePath =>
    getRelativePathAsSplitArray(filePath, relativePath)
  );

  const longestArrayLen = pathArray.reduce(
    (prev, curr) => (curr.length > prev ? curr.length : prev),
    0
  );

  return {
    pathArray,
    longestArrayLen
  };
};

const createFileStructure = (dirArr, relativePath) => {
  const output = {
    module: relativePath,
    children: []
  };
  const {
    pathArray,
    longestArrayLen
  } = generateRelativePathArrAndGetDeepestNestedFile(dirArr, relativePath);
  for (let i = 0; i < longestArrayLen; i += 1) {
    pathArray.forEach(arr => {
      // out of bounds
      if (i >= arr.length) return;

      // is file
      if (i === arr.length - 1) {
        const file = {
          leaf: true,
          module: arr[i],
          parent: arr[i - 1] ? arr[i - 1] : relativePath
        };
        let layer = output.children;
        for (let j = 0; j < i; j += 1) {
          const parentIndex = findParentIndex(layer, arr[j]);
          layer = layer[parentIndex].children;
        }
        layer.push(file);
      }

      // is directory
      const folder = {
        module: arr[i],
        collapsed: true,
        children: [],
        parent: relativePath
      };
      let layer = output.children;
      for (let j = 0; j < i; j += 1) {
        const parentIndex = findParentIndex(layer, arr[j]);
        layer = layer[parentIndex].children;
        folder.parent = arr[j];
      }
      const doesFolderExist = layer.findIndex(
        element => element.module === folder.module
      );
      if (doesFolderExist === -1) layer.push(folder);
    });
  }
  return output;
};

module.exports = {
  createFileStructure
};
