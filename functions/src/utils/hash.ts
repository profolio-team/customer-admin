export const generateUniqHash = async (): Promise<string> => {
  return `hash${Date.now()}${Math.round(Math.random() * 10000)}`;
};
