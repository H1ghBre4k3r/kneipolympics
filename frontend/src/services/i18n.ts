import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export type Labels =
  | "register"
  | "alreadyGotAccount"
  | "login"
  | "forgotYouPassword"
  | "noAccount"
  | "enterRecoveryEmail"
  | "recoveryEmailSend"
  | "enterNewPassword"
  | "newPassword"
  | "passwordUpdated"
  | "submit"
  | "username"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "password"
  | "token"
  | "smoker"
  | "registerSuccess";

type Resources = {
  [key: string]: {
    translation: {
      [label in Labels]: string;
    };
  };
};

const resources: Resources = {
  en: {
    translation: {
      register: "Register",
      alreadyGotAccount: "Already Got Account?",
      login: "Login",
      forgotYouPassword: "Forgot you password?",
      noAccount: "No Account?",
      enterRecoveryEmail:
        "Enter your E-Mail address to receive an E-Mail with a link to recover your account.",
      recoveryEmailSend:
        "Recovery E-Mail send! Check you mail (and spam folder)!",
      enterNewPassword: "Please enter your new password!",
      newPassword: "New Password",
      passwordUpdated: "Password updated successfully! You can now log in!",
      submit: "Submit",
      username: "Username",
      firstName: "First Name",
      lastName: "Last Name",
      email: "E-Mail",
      phone: "Phone Number",
      password: "Password",
      token: "Token",
      smoker: "Are Smoking Bars OK?",
      registerSuccess:
        "Registration successful! Check you mail (and spam folder)!",
    },
  },
  de: {
    translation: {
      register: "Registrieren",
      alreadyGotAccount: "Du hast schon einen Account?",
      login: "Anmelden",
      forgotYouPassword: "Passwort vergessen?",
      noAccount: "Noch keinen Account?",
      enterRecoveryEmail:
        "Bitte gib deine E-Mail-Adresse ein um einen Link für die Wiederherstellung deines Accounts zu erhalten!",
      recoveryEmailSend:
        "Wiederherstellungsmail abgeschickt! Bitte überprüfe dein Postfach (und deinen Spam-Ordner)!",
      enterNewPassword: "Bitte gib dein neues Passwort ein!",
      newPassword: "Neues Passwort",
      passwordUpdated:
        "Passwort erfolgreich aktualisiert! Du kannst dich jetzt anmelden!",
      submit: "Abschicken",
      username: "Nutzername",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "E-Mail",
      phone: "Telefonnummer",
      password: "Passwort",
      token: "Token",
      smoker: "Sind Raucherbars ok?",
      registerSuccess:
        "Registrierung erfolgreich! Bitte überprüfe dein Postfach (und deinen Spam-Ordner)!",
    },
  },
} as const;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    lng: navigator.language, // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
