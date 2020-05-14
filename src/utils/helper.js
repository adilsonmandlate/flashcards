import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import {
  submitData,
  submitCardData,
  retrieveData,
  removeData,
  retrieveDataByKey,
} from "./api";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEY = "DeckCard:notification";

export const saveDeckTitle = (title) => {
  return submitData({ key: title, value: { title, questions: [] } }).then(
    () => {
      return;
    }
  );
};

export const getDecks = () => {
  return retrieveData().then((results) => {
    return results;
  });
};

export const getDeck = (id) => {
  return retrieveDataByKey(id).then((result) => {
    return result;
  });
};

export const addCardToDeck = ({ title, card }) => {
  return submitCardData({ title, card })
    .then(() => {
      return;
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

export const removeDeck = (title) => {
  return removeData(title).then(() => {
    return;
  });
};

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};

export const createNotification = () => ({
  title: "Study reminder",
  body: "Don't forget to study today",
  ios: {
    sound: true,
  },
});

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(8);
            tomorrow.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day",
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
};
