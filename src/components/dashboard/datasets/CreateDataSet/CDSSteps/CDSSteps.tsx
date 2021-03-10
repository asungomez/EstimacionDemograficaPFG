import { EuiStepsHorizontal } from '@elastic/eui';
import { EuiStepHorizontalProps } from '@elastic/eui/src/components/steps/step_horizontal';
import React from 'react';

import { CDS_STEPS, CreateDataSetStep } from '../CreateDataSet';

export type CDSStepsProps = {
  step: CreateDataSetStep;
  onClick: (step: CreateDataSetStep) => void;
};

const isAfter = (before: CreateDataSetStep, after: CreateDataSetStep) =>
  CDS_STEPS.indexOf(before) < CDS_STEPS.indexOf(after);

type StepTitles = {
  [step in CreateDataSetStep]: string;
};

const stepTitles: StepTitles = {
  'select-file': 'Selección del fichero de datos',
  'read-file': 'Lectura del contenido del fichero',
  'map-file-contents': 'Selección de datos para almacenar',
  save: 'Guardar conjunto de datos',
};

const CDSSteps: React.FC<CDSStepsProps> = ({ step, onClick }) => {
  const steps: EuiStepHorizontalProps[] = CDS_STEPS.map(stepName => ({
    title: stepTitles[stepName],
    isSelected: step === stepName,
    onClick: () => onClick(stepName),
    isComplete: isAfter(stepName, step),
  }));
  return (
    <EuiStepsHorizontal steps={steps} style={{ background: 'transparent' }} />
  );
};

export default CDSSteps;
