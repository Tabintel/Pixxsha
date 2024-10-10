"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAuth = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const env_1 = require("../config/env");
const supabase = (0, supabase_js_1.createClient)(env_1.SUPABASE_URL, env_1.SUPABASE_ANON_KEY);
exports.supabaseAuth = {
    signUp: (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const { data: authData, error: authError } = yield supabase.auth.signUp({
            email,
            password,
            options: {
                data: { username }
            }
        });
        if (authError)
            throw authError;
        if (authData.user) {
            const { error: profileError } = yield supabase
                .from('profiles')
                .insert({ user_id: authData.user.id, username });
            if (profileError)
                console.error('Error creating profile:', profileError);
        }
        console.log('Please check your email for the confirmation link.');
        return authData.user;
    }),
    signIn: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const { data, error } = yield supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error)
            throw error;
        return data.user;
    }),
    signOut: () => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = yield supabase.auth.signOut();
        if (error)
            throw error;
    }),
    getCurrentUser: () => __awaiter(void 0, void 0, void 0, function* () {
        const { data: { user } } = yield supabase.auth.getUser();
        return user;
    }),
    verifyEmail: (token, email) => __awaiter(void 0, void 0, void 0, function* () {
        const { data, error } = yield supabase.auth.verifyOtp({
            token,
            type: 'signup',
            email
        });
        if (error)
            throw error;
        return data;
    }),
    updateProfile: (userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Attempting to update profile for user:', userId);
        console.log('Updates:', updates);
        const { data, error } = yield supabase
            .from('profiles')
            .upsert(Object.assign(Object.assign({ user_id: userId }, updates), { updated_at: new Date() }))
            .select();
        if (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
        console.log('Profile update result:', data);
        return data[0];
    }),
    getProfile: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const { data, error } = yield supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (error)
            throw error;
        return data;
    })
};
