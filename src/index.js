const { v4: uuidv4 } = require("uuid");
import AsyncStorage from "@react-native-async-storage/async-storage";

const getClientId = async () => {
  let clientId = await AsyncStorage.getItem("client_id");

  if (!clientId) {
    clientId = uuidv4();
    await AsyncStorage.setItem("client_id", clientId);
  }

  return clientId;
};

export const logEventToGA4 = async (
  ga4ApiSecret,
  measurementId,
  eventName,
  eventParams = {}
) => {
  const clientId = await getClientId(); // Retrieve or generate client ID

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${ga4ApiSecret}`;

  const payload = {
    client_id: clientId,
    events: [
      {
        name: eventName,
        params: eventParams,
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("Event logged successfully:", eventName);
    } else {
      console.error(
        "Failed to log event:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error logging event:", error);
  }
};
