import * as usersService from '../../src/services/usersService';

describe('getUser', () => {
  test('ユーザ情報の取得が正常に行えること', async () => {
    const user = await usersService.getUser('clr8hru5l0002le4xxxmahx71');
    expect(user).toBeDefined();
    expect(user?.name).toEqual('saburo');
    expect(user?.email).toEqual('saburo@example.com');
  });
});
