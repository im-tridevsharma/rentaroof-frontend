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

export const acceptOrRejectVerification = async (id, data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/properties/accept_or_reject_verification/${id}`, data, {
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

export const deleteConversation = async (id) => {
  const token = __d(cookies.get("_SYNC_"));

  let conversation = false;
  await server
    .delete(`/chat/conversations/${id}`, {
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

export const getUpcomingPayments = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let upcoming_payments = false;
  await server
    .get(`/tenant/upcoming_payments/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      upcoming_payments = response?.data;
    })
    .catch((error) => {
      upcoming_payments = error?.response?.data;
    });
  return upcoming_payments;
};

export const getIboEarnings = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let earnings = false;
  await server
    .get(`/earnings/ibo`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      earnings = response?.data;
    })
    .catch((error) => {
      earnings = error?.response?.data;
    });
  return earnings;
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

//sos pressed
export const createSOS = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/sos`, data, {
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

//sos pressed
export const vvcStatus = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/meetings/vvc/status`, data, {
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

//sos pressed
export const getDealableProperty = async (data) => {
  const token = __d(cookies.get("_SYNC_"));

  let status = false;
  await server
    .post(`/deals/property`, data, {
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

//store_and_login
export const storeAndLogin = async (data) => {
  let status = false;
  await server
    .post(`/store_and_login`, data)
    .then((response) => {
      status = response?.data;
    })
    .catch((error) => {
      status = error?.response?.data;
    });
  return status;
};

//getPropertyGalleryById
export const getPropertyGalleryById = async (id) => {
  if (id) {
    const token = __d(cookies.get("_SYNC_"));

    let gallery = false;
    await server
      .get(`/properties/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        gallery = response?.data;
      })
      .catch((error) => {
        gallery = error?.response?.data;
      });
    return gallery;
  } else {
    return false;
  }
};

//get deals
export const getDealOffered = async () => {
  const token = __d(cookies.get("_SYNC_"));

  let deals = false;
  await server
    .get(`/deals`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      deals = response?.data;
    })
    .catch((error) => {
      deals = error?.response?.data;
    });
  return deals;
};

//get featured properties
export const getFeaturedProperties = async () => {
  let properties = false;
  await server
    .get(`/properties/featured`)
    .then((response) => {
      properties = response?.data;
    })
    .catch((error) => {
      properties = error?.response?.data;
    });
  return properties;
};

//get is sos
export const getIsSOS = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let sos = false;
  await server
    .get(`/is-sos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      sos = response?.data;
    })
    .catch((error) => {
      sos = error?.response?.data;
    });
  return sos;
};

//get police verification
export const getPoliceVerification = async (id) => {
  const token = __d(cookies.get("_SYNC_"));
  let res = false;
  await server
    .get(`/police-verification/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      res = response?.data;
    })
    .catch((error) => {
      res = error?.response?.data;
    });
  return res;
};

//get ibo earning cards
export const getIboCards = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let cards = false;
  await server
    .get(`/earnings/ibo/cards`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      cards = response?.data;
    })
    .catch((error) => {
      cards = error?.response?.data;
    });
  return cards;
};

//get ibo earning deals
export const getIboDeals = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let deals = false;
  await server
    .get(`/earnings/ibo/deals`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      deals = response?.data;
    })
    .catch((error) => {
      deals = error?.response?.data;
    });
  return deals;
};

//get ibo earning deals
export const getIboForYear = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let for_year = false;
  await server
    .get(`/earnings/ibo/for_year`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      for_year = response?.data;
    })
    .catch((error) => {
      for_year = error?.response?.data;
    });
  return for_year;
};

//---------------------------------landlord------------------------

//get ibo earning cards
export const getLandlordCards = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let cards = false;
  await server
    .get(`/earnings/landlord/cards`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      cards = response?.data;
    })
    .catch((error) => {
      cards = error?.response?.data;
    });
  return cards;
};

//get ibo earning deals
export const getLandlordDeals = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let deals = false;
  await server
    .get(`/earnings/landlord/deals`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      deals = response?.data;
    })
    .catch((error) => {
      deals = error?.response?.data;
    });
  return deals;
};

//get ibo earning deals
export const getLandlordForYear = async () => {
  const token = __d(cookies.get("_SYNC_"));
  let for_year = false;
  await server
    .get(`/earnings/landlord/for_year`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      for_year = response?.data;
    })
    .catch((error) => {
      for_year = error?.response?.data;
    });
  return for_year;
};
