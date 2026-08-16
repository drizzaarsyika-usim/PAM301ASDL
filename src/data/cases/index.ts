import { SdlCase } from '../../types';
import { CARDIO_CASES } from './cardiology';
import { RESPIRATORY_CASE } from './respiratory';
import { NEPHROLOGY_CASE } from './nephrology';
import { GASTRO_CASE } from './gastroenterology';
import { ENDOCRINOLOGY_CASE } from './endocrinology';
import { RHEUM_DERM_NEURO_CASE } from './rheum_derm_neuro';
import { HAEM_INFECTIOUS_CASE } from './haem_infectious';
import { EMERGENCY_CASE } from './emergency';

export const ALL_SDL_CASES: SdlCase[] = [
  ...CARDIO_CASES, // Week 1 (Cardio 1) & Week 2 (Cardio 2)
  RESPIRATORY_CASE, // Week 3
  NEPHROLOGY_CASE, // Week 4
  GASTRO_CASE, // Week 5
  ENDOCRINOLOGY_CASE, // Week 6
  RHEUM_DERM_NEURO_CASE, // Week 7
  HAEM_INFECTIOUS_CASE, // Week 8
  EMERGENCY_CASE // Week 9
];

export const GET_CASE_BY_ID = (id: string): SdlCase => {
  return ALL_SDL_CASES.find((c) => c.id === id) || ALL_SDL_CASES[0];
};
