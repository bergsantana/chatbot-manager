export const saveLastUrl = (url: string) => {
  localStorage.setItem("lastUrl", url);
};

export const getLastUrl = (): string | null => {
  return localStorage.getItem("lastUrl");
};