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
const supabase_auth_1 = require("./supabase-auth");
function testSupabaseAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Test sign-up
            const username = 'testuser';
            const email = 'ekeminisamuel19@gmail.com';
            const password = 'securePassword123!';
            console.log('Testing sign-up...');
            const newUser = yield supabase_auth_1.supabaseAuth.signUp(username, email, password);
            console.log('Sign-up successful:', newUser);
            // Test sign-in
            console.log('Testing sign-in...');
            const signedInUser = yield supabase_auth_1.supabaseAuth.signIn(email, password);
            console.log('Sign-in successful:', signedInUser);
            // Test get current user
            console.log('Testing get current user...');
            const currentUser = yield supabase_auth_1.supabaseAuth.getCurrentUser();
            console.log('Current user:', currentUser);
            // Test sign-out
            console.log('Testing sign-out...');
            yield supabase_auth_1.supabaseAuth.signOut();
            console.log('Sign-out successful');
            // Verify sign-out
            const userAfterSignOut = yield supabase_auth_1.supabaseAuth.getCurrentUser();
            console.log('User after sign-out:', userAfterSignOut);
        }
        catch (error) {
            console.error('Test failed:', error);
        }
    });
}
testSupabaseAuth();
