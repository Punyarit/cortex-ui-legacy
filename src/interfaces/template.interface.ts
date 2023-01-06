import type { HomeMedicationRequestEntity } from '@hlab/medication-api-interfaces/entities';
export type HomeMedicationRequest = HomeMedicationRequestEntity;

export type MedicationActionType = 'ORDER' | 'DISCONTINUE' | 'CONTINUE' | 'DISABLED';
export interface MedicationListData {
  previousRequests: HomeMedicationRequest;
  currentRequests: HomeMedicationRequest;
  isError: boolean;
  action: MedicationActionType;
}
