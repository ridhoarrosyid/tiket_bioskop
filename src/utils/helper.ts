export const getAccessUrl = (path = 'thumbnail') => {
  const appurl = process.env.APP_URL ?? '';
  return `${appurl}/uploads/${path}/`;
};
