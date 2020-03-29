import RNFS, {ReadDirItem} from 'react-native-fs';

export const listFilesRecursive = async (
  path: string = RNFS.DownloadDirectoryPath,
) => {
  console.log('list files');

  const items = await RNFS.readDir(path);
  let fileList: ReadDirItem[] = [];

  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    if (item.isFile()) {
      fileList.push(item);
    } else if (item.isDirectory()) {
      const dirFiles = await listFilesRecursive(item.path);
      fileList = fileList.concat(dirFiles);
    }
  }

  return fileList;
};

export const makeTrack = (item: ReadDirItem) => {
  return {
    id: item.path, // Must be a string, required
    url: `file://${item.path}`, // Load media from the file system
    title: item.name,
  };
};
