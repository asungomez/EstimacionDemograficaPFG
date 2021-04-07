import { useCallback, useEffect } from 'react';

import Parser, {
  FileContents,
  FileType,
  ParserDefinition,
} from '../parser/Parser';
import useAsyncState from './useAsyncState';

export type ReadError = 'custom-filetype' | 'parsing-error';

const useReadFile = (file: File) => {
  const [loading, setLoading] = useAsyncState(true);
  const [error, setError] = useAsyncState<ReadError>(null);
  const [data, setData] = useAsyncState<FileContents>(null);

  const readFile = useCallback(
    (format: FileType, config?: ParserDefinition) => {
      Parser.parseFile(file, format, config)
        .then(data => {
          setData(data);
          setError(null);
          setLoading(false);
        })
        .catch(() => {
          setError('parsing-error');
          setLoading(false);
        });
    },
    [setData, setError, setLoading, file]
  );

  const retry = useCallback(
    (format: FileType, config?: ParserDefinition) => {
      setLoading(true);
      setError(null);
      readFile(format, config);
    },
    [setLoading, setError, readFile]
  );

  useEffect(() => {
    if (loading) {
      const fileType = Parser.guessFileTypeFromExtension(file.name);
      if (fileType !== 'custom') {
        readFile(fileType);
      } else {
        setError('custom-filetype');
        setLoading(false);
      }
    }
  }, [file.name, readFile, setError, setLoading, loading]);

  return { data, loading, error, retry };
};

export default useReadFile;
