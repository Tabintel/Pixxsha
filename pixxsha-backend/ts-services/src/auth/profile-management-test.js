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
function testProfileManagement() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = 'ekeminisamuel19@gmail.com';
            const password = 'securePassword123!';
            const username = 'testuser';
            console.log('Signing in the user...');
            const signedInUser = yield supabase_auth_1.supabaseAuth.signIn(email, password);
            console.log('User signed in:', signedInUser);
            if (signedInUser && signedInUser.id) {
                // Update profile
                console.log('Testing profile update...');
                const updatedProfile = yield supabase_auth_1.supabaseAuth.updateProfile(signedInUser.id, { username: 'updatedUsername' });
                console.log('Profile updated:', updatedProfile);
                // Get profile
                console.log('Testing profile retrieval...');
                const profile = yield supabase_auth_1.supabaseAuth.getProfile(signedInUser.id);
                console.log('Retrieved profile:', profile);
            }
            else {
                console.log('User sign-in failed or user ID is missing');
            }
        }
        catch (error) {
            console.error('Test failed:', error);
            if (error instanceof Error) {
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
            }
        }
    });
}
testProfileManagement();
