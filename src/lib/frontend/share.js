import Cookies from "universal-cookie";
import server, { __e, __d } from "../../server";

const cookies = new Cookies();

export const saveIboRating = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .post("/ratings/ibo", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const saveIboNotication = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let notification = false;
  await server
    .post("/ibo/notifications", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const saveLandlordNotication = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let notification = false;
  await server
    .post("/landlord/notifications", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const saveUserNotication = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let notification = false;
  await server
    .post("/tenant/notifications", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const getIboRating = async (id) => {
  let rating = false;
  await server
    .get("/ratings/ibo/all/" + id)
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getUnseenNotification = async (user) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get(`/${user}/notifications/unseen`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const getIboNotification = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/ibo/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const getLandlordNotification = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/landlord/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const getUserNotification = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/tenant/notifications", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const saveLandlordRating = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .post("/ratings/landlord", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const saveUserRating = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .post("/ratings/tenant", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getLandlordRating = async (id) => {
  let rating = false;
  await server
    .get("/ratings/landlord/all/" + id)
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getUserRating = async (id) => {
  let rating = false;
  await server
    .get("/ratings/tenant/all/" + id)
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const delLandlordNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .delete("/landlord/notifications/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const delIboNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .delete("/ibo/notifications/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const delUserNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .delete("/tenant/notifications/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const seenUserNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/tenant/notifications/seen/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const seenIboNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/ibo/notifications/seen/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const seenLandlordNotification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let notification = false;
  await server
    .get("/landlord/notifications/seen/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      notification = response?.data;
    })
    .catch((error) => {
      notification = error?.response?.data;
    });
  return notification;
};

export const getAmenities = async (id) => {
  let amenities = false;
  await server
    .get("/amenities")
    .then((response) => {
      amenities = response?.data;
    })
    .catch((error) => {
      amenities = error?.response?.data;
    });
  return amenities;
};

//agreements
export const saveAgreement = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .post("/agreements", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getAgreements = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let rating = false;
  await server
    .get("/agreements", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      rating = response?.data;
    })
    .catch((error) => {
      rating = error?.response?.data;
    });
  return rating;
};

export const getPropertiesForVerification = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let properties = false;
  await server
    .get("/properties/for_verification", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      properties = response?.data;
    })
    .catch((error) => {
      properties = error?.response?.data;
    });
  return properties;
};

export const changeVerificationStatus = async (id, data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/properties/change_verification_status/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

export const getUserReferrals = async (options = "") => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/users/referrals?${options}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

export const getConversations = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let conversation = false;
  await server
    .get(`/chat/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      conversation = response?.data;
    })
    .catch((error) => {
      conversation = error?.response?.data;
    });
  return conversation;
};

export const getUsersForChat = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let users = false;
  await server
    .get(`/chat/users_for_conversation`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      users = response?.data;
    })
    .catch((error) => {
      users = error?.response?.data;
    });
  return users;
};

export const saveOrUpdateSetting = async (data) => {
  const token = __d(cookies.get("_SYNC_"));
  let setting = false;

  if (token) {
    await server
      .post("/settings/template", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setting = response?.data;
      })
      .catch((error) => {
        setting = error?.response?.data;
      });
  }
  return setting;
};

export const createConversation = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let conversation = false;
  await server
    .post(`/chat/conversations`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      conversation = response?.data;
    })
    .catch((error) => {
      conversation = error?.response?.data;
    });
  return conversation;
};

export const getMessages = async (conversationId) => {
  const token = __d(cookies.get("_SYNC_"));

  let message = false;
  await server
    .get(`/chat/messages/${conversationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      message = response?.data;
    })
    .catch((error) => {
      message = error?.response?.data;
    });
  return message;
};

export const getVisitedProperties = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let properties = false;
  await server
    .get(`/properties/visited`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      properties = response?.data;
    })
    .catch((error) => {
      properties = error?.response?.data;
    });
  return properties;
};

export const createPaymentOrder = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/payment/order/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

export const successPayment = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/payment/success/`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

export const getTransactions = async (user = "") => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/payment/transactions/?user=${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

export const getRecentTransactions = async (user = "") => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/payment/recent/?user=${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

export const getWallet = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/users/wallet/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

export const getWalletTransactions = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/users/wallet/transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

//complains

export const getComplains = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let complains = false;
  await server
    .get(`/users/complains`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      complains = response?.data;
    })
    .catch((error) => {
      complains = error?.response?.data;
    });
  return complains;
};

export const saveComplains = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let complains = false;
  await server
    .post(`/users/complains`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      complains = response?.data;
    })
    .catch((error) => {
      complains = error?.response?.data;
    });
  return complains;
};

export const deleteComplains = async (id) => {
  const token = __d(cookies.get("_SYNC_"));

  let complains = false;
  await server
    .delete(`/users/complains/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      complains = response?.data;
    })
    .catch((error) => {
      complains = error?.response?.data;
    });
  return complains;
};

//deal

export const getDeal = async (id) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/properties/deals/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

export const closeDeal = async (id, conversationId) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/properties/deals/close/${id}?conversationId=${conversationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

//change deal status
export const changeDealStatus = async (id, data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/properties/deals/status/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

//property rent transactions
export const getPropertyRentTransactions = async (code) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/properties/rent/transactions/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

//property closed
export const closeProperty = async (code) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/properties/closed/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

//property open
export const openProperty = async (code) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .get(`/properties/open/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

//accept or reject conversation
export const conversationStatus = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/chat/conversations/status`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};
