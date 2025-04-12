import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export type Labels =
  | "langId"
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
  | "registerSuccess"
  | "infoAndRegistration"
  | "currentGame"
  | "profile"
  | "registrationDisclaimer"
  | "where"
  | "when"
  | "what"
  | "note"
  | "finalRegistration"
  | "furtherInformation"
  | "wantToJoin"
  | "wantToLeave"
  | "participating"
  | "name"
  | "address"
  | "task"
  | "needsPicture"
  | "rules"
  | "generalInfo";

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
      langId: "en",
      register: "Register",
      alreadyGotAccount: "Already Got An Account?",
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
      infoAndRegistration: "Info & Registration",
      currentGame: "Current Game",
      profile: "Profile",
      registrationDisclaimer:
        "This is not the registration for the current Kneipolympics but only for the platform in general! If you want to take part, you have to confirm your participation separately after registration!",
      where: "Where",
      when: "When",
      what: "What",
      note: "Note",
      finalRegistration:
        "This is the binding registration for the Kneipolympics! You are able to withdraw your participation and change your preferences (e.g., smoking bars) until April 20th, 11:59PM.",
      furtherInformation:
        "The Kneipolympics haven't started yet. Stay tuned for April 26th!",
      wantToJoin: "I Want To Join!",
      wantToLeave: "I Want To Leave!",
      participating: "You are paricipating in the 2025 Kneipolympics.",
      name: "Name",
      address: "Address",
      task: "Task",
      needsPicture: "Needs Picture?",
      rules: "Rules",
      generalInfo: "General Info",
    },
  },
  de: {
    translation: {
      langId: "de",
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
      infoAndRegistration: "Infos & Anmeldung",
      currentGame: "Aktuelles Spiel",
      profile: "Profil",
      registrationDisclaimer:
        "Das ist nicht die Anmeldung für die aktuellen Kneipolympics sondern nur für die Plattform! Wenn du mitmachen möchtest, dann musst du deine Teilnahme danach nochmal separat bestätigen!",
      where: "Wo",
      when: "Wann",
      what: "Was",
      note: "Wichtig",
      finalRegistration:
        "Dies ist die bindende Anmeldung für die Kneipolympics! Bis zum 20. April um 23:59 Uhr kannst du deine Anmeldung noch zurückziehen oder deine Einstellungen (z.B. Raucherbars) anpassen.",
      furtherInformation:
        "Die Kneipolympics haben noch nicht begonnen. Freut euch auf den 26. April!",
      wantToJoin: "Ich will teilnehmen!",
      wantToLeave: "Ich will nicht teilnehmen!",
      participating: "Du nimmst an den Kneipolympics 2025 teil.",
      name: "Name",
      address: "Adresse",
      task: "Aufgabe",
      needsPicture: "Benötigt Bild?",
      rules: "Regeln",
      generalInfo: "Allgemeine Informationen",
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
