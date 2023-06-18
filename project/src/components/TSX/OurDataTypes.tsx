export interface manModel {
  model_name: string;
  model_id: number;
  man_id: number;
}

export interface manImpoType{
  manName: string;
  manId: number;
  models: manModel[];
}
export interface modelImpoType{
  modelName: string;
  modelId: number;
  manId: number;
}

export type CheckData = {
  man_name: string;
  man_id: number;
};