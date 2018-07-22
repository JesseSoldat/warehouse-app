import { STORAGE_FETCH_ALL, STORAGE_FETCH_ONE } from "../actions/storage";

const initialState = {
  storages: [],
  storage: null,
  storageType: null
};

export default (state = initialState, action) => {
  const { type, storages, storage, storageType } = action;
  switch (type) {
    case STORAGE_FETCH_ALL:
      // console.log("STORAGE_FETCH_ALL", storages);
      return {
        ...state,
        storages: [...storages],
        storage: null,
        storageType: null
      };

    case STORAGE_FETCH_ONE:
      // console.log("STORAGE_FETCH_ONE", action);
      return { ...state, storage, storageType };

    default:
      return { ...state };
  }
};
