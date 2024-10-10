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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pinata_service_1 = require("./pinata-service");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function testPinataService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filePath = path_1.default.join(__dirname, '..', 'assets', 'test-image.jpeg');
            const file = new File([fs_1.default.readFileSync(filePath)], "test-image.jpeg", { type: "image/jpeg" });
            const userId = 'test-user-id';
            const title = 'Test Photo';
            const result = yield pinata_service_1.pinataService.uploadFile(file, title, userId);
            console.log("Upload result:", result);
        }
        catch (error) {
            console.error("Test failed:", error);
        }
    });
}
testPinataService();
