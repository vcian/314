import { AES, enc } from "crypto-js";
import { toast } from "react-hot-toast";
import { cookieExpiresInDays, cookieKeys, toasterPosition } from "../constants/constants";

export const toastSuccess = (message: string) => {
  toast.remove();
  toast.success(message, {
    position: toasterPosition,
    style: {
      color: "#000",
      minWidth: 150,
      padding: 10,
      fontWeight: 500,
      marginBottom: 60,
      border: "1px solid #073E84"
    },
    iconTheme: { primary: "#073E84 ", secondary: "#fff" }
  });
};

export const toastError = (message: string) => {
  toast.remove();
  toast.error(message, {
    position: toasterPosition,
    style: {
      color: "#000",
      fontWeight: 500,
      padding: 10,
      marginBottom: 60,
      border: "1px solid #ff0000"
    }
  });
};

export const setEncryptedLocalStorage = (key: string, data: any) => {
  if (data && key) {
    const encryptedString = encryptData(data);
    const keyName = cookieKeys.cookieInitial + "-" + key.trim();
    localStorage.setItem(keyName, encryptedString.toString());
  }
};

export const getDecryptedLocalStorage = (key: string) => {
  if (key) {
    const keyName = cookieKeys.cookieInitial + "-" + key.trim();
    const localStorageData = localStorage.getItem(keyName);
    if (localStorageData) {
      return decryptData(localStorageData);
    } else {
      const cookieUser = getEncryptedCookie(cookieKeys.cookieUser);
      if (!cookieUser) {
        removeDecryptedCookie(cookieKeys.cookieUser);
      }
    }
  }
};

export const getEncryptedCookie = (key: string) => {
  if (key) {
    const keyName = cookieKeys.cookieInitial + "-" + key.trim();
    const cookieData = getCookie(keyName);
    if (cookieData) {
      return decryptData(cookieData);
    }
  }
};

export const removeDecryptedCookie = (key: string) => {
  if (key) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const keyName = cookieKeys.cookieInitial + "-" + key.trim();
    // put the name of the project of which you want to remove the cooki in current case it is "universe"
    document.cookie = `${keyName}=;expires=${new Date(0).toUTCString()};domain=${window.location.hostname.replace("universe", "")};path=/;`;
    // document.cookie = `${keyName}=;expires=${new Date(0).toUTCString()};domain=localhost;path=/;`;
  }
};

export const encryptData = (data: any) => {
  return AES.encrypt(JSON.stringify(data), cookieKeys.cryptoSecretKey);
};

export const decryptData = (data: any) => {
  const bytes = AES.decrypt(data.toString(), cookieKeys.cryptoSecretKey);
  if (bytes.toString()) {
    return JSON.parse(bytes.toString(enc.Utf8));
  }
};

const getCookie = (cookieName: any) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  if (decodedCookie) {
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      while (c.charAt(0) === "") {
        c = c.substring(1);
      }
      if (+c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return "";
};

export const handleLogout = () => {
  localStorage.clear();

  removeDecryptedCookie(cookieKeys.cookieUser);

  // navigate("/login");
};

export const setEncryptedCookie = (key: string, data: any) => {
  if (data && key) {
    const encryptedString = encryptData(data);
    const keyName = cookieKeys.cookieInitial + "-" + key.trim();
    const date = new Date();
    const expiryTime = new Date(date.setTime(date.getTime() + cookieExpiresInDays * 24 * 60 * 60 * 1000)).toUTCString();
    document.cookie = `${keyName}=${encryptedString};expires=${expiryTime};domain=${window.location.hostname.replace("accounts", "")};secure;path=/;`;
    // this.localStorageService.set(keyName, encryptedString);
  }
};
