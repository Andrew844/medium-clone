import {PopularTagType} from './popularTag.type';

export interface PopularTagsStateInterface {
  isLoading: boolean;
  data: null | PopularTagType[];
  errors: string | null;
}
