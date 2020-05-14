import { AsyncStorage } from "react-native";

export const STORAGE_KEY = "Udacity:Cards";

export const submitData = ({ key, value }) => {
  return AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [key]: value,
    })
  );
};

export const submitCardData = ({ title, card }) => {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    const newQuestions = [card, ...data[title].questions];
    data[title].questions = newQuestions;
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
};

export const retrieveData = () => {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    return JSON.parse(results);
  });
};

export const retrieveDataByKey = (key) => {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    return data[key];
  });
};

export const removeData = (key) => {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  });
};
