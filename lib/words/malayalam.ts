export const malayalamSentences = [
  "സ്നേഹം ഒരു മനോഹരമായ സ്വപ്നമാണ്",
  "പ്രണയം വസന്തം പോലെയാണ്",
  "നീ എന്റെ ജീവന്റെ പാതിയാണ്",
  "ഓരോ കാത്തിരിപ്പിനും ഒരു സുന്ദരമായ ഉത്തരമുണ്ട്",
  "കാറ്റിന്റെ സംഗീതം നിന്നെ ഓർമ്മിപ്പിക്കുന്നു",
  "നിന്റെ പുഞ്ചിരി എന്റെ ലോകം തെളിക്കുന്നു",
  "ഇരുളിലെ വെളിച്ചമാണ് നല്ല സുഹൃത്തുക്കൾ",
  "തോൽവികൾ വിജയത്തിന്റെ ചവിട്ടുപടികളാണ്",
  "പ്രതീക്ഷകൾ എന്നും മുന്നോട്ട് നയിക്കുന്നു",
  "സ്നേഹിക്കാൻ ഒരു മനസ്സ് മതി",
  "മൗനത്തിനും ഒരുപാട് പറയാനുണ്ട്",
  "ജീവിതം ഒരു കവിത പോലെ മനോഹരമാണ്",
  "ഇന്നലെകൾ പാഠവും നാളെകൾ പ്രതീക്ഷയുമാണ്",
  "മഴത്തുള്ളികൾ പ്രണയത്തിന്റെ ഭാഷയാണ്"
];

export const getRandomSentences = () => {
  const shuffled = [...malayalamSentences].sort(() => 0.5 - Math.random());
  const shuffled2 = [...malayalamSentences].sort(() => 0.5 - Math.random());
  const shuffled3 = [...malayalamSentences].sort(() => 0.5 - Math.random());
  return [...shuffled, ...shuffled2, ...shuffled3];
};

export const getRandomWords = () => getRandomSentences().join(' ');
