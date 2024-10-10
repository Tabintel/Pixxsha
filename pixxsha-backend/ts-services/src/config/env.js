"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PINATA_GATEWAY = exports.PINATA_JWT = exports.SUPABASE_ANON_KEY = exports.SUPABASE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SUPABASE_URL = process.env.SUPABASE_URL;
exports.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
exports.PINATA_JWT = process.env.PINATA_JWT;
exports.PINATA_GATEWAY = process.env.PINATA_GATEWAY;
