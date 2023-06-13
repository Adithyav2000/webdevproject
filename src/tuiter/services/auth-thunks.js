import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";


export const loginThunk = createAsyncThunk(

 "user/login", async (credentials) => {
   const user = await authService.login(credentials);
   return user;

 }
);
export const profileThunk = createAsyncThunk(
    "auth/profile", async () => {
    const response = authService.profile();
    return response.data;
   });
   export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
    return await authService.logout();
   });
   export const updateUserThunk = createAsyncThunk(
    "user/updateUser", async (user) => {
      
      console.log(await authService.updateUser(user));
      return user;
   });
   export const registerthunk = createAsyncThunk(
    "user/register", async (credentials) => {
      await authService.register(credentials);
      const user = await authService.login(credentials);
      return user;
   });
   