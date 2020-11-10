import { BaseAction } from "./generalActions";

export enum AppActionTypes {
    SWITCH_MAIN_VIEW = 'SWITCH_MAIN_VIEW'
}

export interface SwitchMainView extends BaseAction<AppActionTypes.SWITCH_MAIN_VIEW> {
  type: AppActionTypes.SWITCH_MAIN_VIEW,
  payload: 'calendar' | 'map'
}

export const switchMainView = (view: 'calendar' | 'map'): SwitchMainView => {
  return {
    type: AppActionTypes.SWITCH_MAIN_VIEW,
    payload: view
  }
}

export type AppActions = SwitchMainView