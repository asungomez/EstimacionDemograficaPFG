import React from 'react';

export type CDSReadFileProps = {
  file: File;
  onRead: (data: any[]) => void;
  onCancel: () => void;
};

const CDSReadFile: React.FC<CDSReadFileProps> = ({
  file,
  onRead,
  onCancel,
}) => {
  return <>Read</>;
};

export default CDSReadFile;
