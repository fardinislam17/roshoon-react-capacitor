import data from '../data/usa-states-cities.json';

export const fetchStates = () => {
  return new Promise((resolve) => {
    const states = data.states.map((state) => ({
      label: state.name,
      value: state.state_code,
    }));
    resolve(states);
  });
};

export const fetchCities = (stateCode) => {
  return new Promise((resolve) => {
    const state = data.states.find((state) => state.state_code === stateCode);

    if (state) {
      const cities = state.cities.map((city) => ({
        label: city.name,
        value: city.id,
      }));
      resolve(cities);
    } else {
      resolve([]);
    }
  });
};
