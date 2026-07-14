import type { RootState } from "@app/providers/store";

export const selectUser = (state: RootState) => state.user.user;

export const selectIsAuthed = (state: RootState) => Boolean(state.user.user);

/** auth_key + user_id — то, что нужно для авторизованных запросов. */
export const selectAuth = (state: RootState) => {
  const user = state.user.user;
  return user ? { auth_key: user.auth_key, user_id: user.user_id } : null;
};
