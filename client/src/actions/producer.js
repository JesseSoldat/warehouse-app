export const PRODUCERS_FETCH_ALL = "PRODUCERS_FETCH_ALL";

export const getProducers = producers => ({
  type: PRODUCERS_FETCH_ALL,
  producers
});
