import data from '../data/usa-states-cities.json';

export const fetchStates = () => {
  return new Promise((resolve) => {
    const states = data.states.map((state) => ({
      label: state.name,
      value: state.name,
    }));
    resolve(states);
  });
};

export const fetchCities = (stateName) => {
  return new Promise((resolve) => {
    const state = data.states.find((state) => state.name === stateName);

    if (state) {
      const cities = state.cities.map((city) => ({
        label: city.name,
        value: city.name,
      }));
      resolve(cities);
    } else {
      resolve([]);
    }
  });
};
