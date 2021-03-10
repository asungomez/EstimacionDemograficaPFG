import { EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React, { useState } from 'react';

import { FileContents } from '../../../../parser/Parser';
import CDSMapData from './CDSMapData/CDSMapData';
import CDSReadFile from './CDSReadFile/CDSReadFile';
import CDSSave from './CDSSave/CDSSave';
import CDSSelectFile from './CDSSelectFile/CDSSelectFile';
import CDSSteps from './CDSSteps/CDSSteps';
import { DataItem } from './CreateDataSetMapData/CreateDataSetMapData';

export const CDS_STEPS = [
  'select-file',
  'read-file',
  'map-file-contents',
  'save',
];
export type CreateDataSetStep = typeof CDS_STEPS[number];

const CreateDataSet: React.FC<{}> = () => {
  const [step, setStep] = useState<CreateDataSetStep>('select-file');
  const [file, setFile] = useState<File>(null);
  const [rawData, setRawData] = useState<FileContents>(null);
  const [parsedData, setParsedData] = useState<DataItem[]>(null);

  const selectFile = (file: File) => {
    setFile(file);
    setStep('read-file');
  };

  const readFile = (data: FileContents) => {
    setRawData(data);
    setStep('map-file-contents');
  };

  const mapData = (parsedData: DataItem[]) => {
    setParsedData(parsedData);
    setStep('save');
  };

  const changeStep = (newStep: CreateDataSetStep) => {
    const destinationStepIndex = CDS_STEPS.indexOf(newStep);
    const currentStepIndex = CDS_STEPS.indexOf(step);
    if (destinationStepIndex < currentStepIndex) {
      for (let i = currentStepIndex; i >= destinationStepIndex; i--) {
        rollback(CDS_STEPS[i]);
      }
      setStep(newStep);
    }
  };

  const rollback = (step: CreateDataSetStep) => {
    if (step === 'select-file') {
      setFile(null);
    } else if (step === 'read-file') {
      setRawData(null);
    } else if (step === 'map-file-contents') {
      setParsedData(null);
    }
  };

  const cancel = () => {
    setStep('select-file');
    for (const step of CDS_STEPS) {
      rollback(step);
    }
  };

  return (
    <EuiFlexGroup direction="column" alignItems="flexStart">
      <EuiFlexItem grow={false}>
        <CDSSteps step={step} onClick={changeStep} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        {step === 'select-file' ? (
          <CDSSelectFile onSelect={selectFile} />
        ) : step === 'read-file' ? (
          <CDSReadFile file={file} onCancel={cancel} onRead={readFile} />
        ) : step === 'map-file-contents' ? (
          <CDSMapData rawData={rawData} onCancel={cancel} onMap={mapData} />
        ) : step === 'save' ? (
          <CDSSave data={parsedData} onCancel={cancel} />
        ) : null}
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CreateDataSet;
