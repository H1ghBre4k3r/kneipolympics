import universalLanguageDetect from "@unly/universal-language-detector";

export const lang = universalLanguageDetect({
  supportedLanguages: ["de", "en"], // Whitelist of supported languages, will be used to filter out languages that aren't supported
  fallbackLanguage: "de", // Fallback language in case the user's language cannot be resolved
  errorHandler: (error) => {
    // Optional - Use you own logger here, Sentry, etc.
    console.log("Custom error handler:");
    console.error(error);
  },
});
