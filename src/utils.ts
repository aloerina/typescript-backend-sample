export const isErrorResoponse = (body: object): boolean => {
  //TODO Error 判定を 'errors' という文字列ではなく UserErrorResBody のような型名で実施できるように修正
  // zod の導入検討が有力か
  return 'errors' in body;
};
