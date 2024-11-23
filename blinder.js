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
exports.Handler = void 0;
exports.Blinder = Blinder;
const axios_1 = __importDefault(require("axios"));
function Blinder(skey) {
    return new Handler(skey);
}
class Handler {
    constructor(skey) {
        this.API_URL = "https://hdztvyc5ga.execute-api.us-east-1.amazonaws.com";
        this.secretKey = skey;
    }
    generateRequestHeader(extra) {
        return Object.assign({ 'Content-Type': 'application/json', '_x_auth_skey': this.secretKey }, extra);
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiEndpoint = `${this.API_URL}/v1/create-user`;
            try {
                const response = yield axios_1.default.post(apiEndpoint, data, {
                    headers: this.generateRequestHeader(),
                });
                return response.data;
            }
            catch (error) {
                console.error('[BLINDERAI] Error sending data to API:', error);
            }
            return null;
        });
    }
    createIntent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiEndpoint = `${this.API_URL}/v1/get-intent`;
            try {
                const response = yield axios_1.default.post(apiEndpoint, data, {
                    headers: this.generateRequestHeader(),
                });
                return response.data.token;
            }
            catch (error) {
                console.error('[BLINDERAI] Error sending data to API:', error);
            }
            return null;
        });
    }
    uploadFile(url, fileContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.put(url, fileContent, {
                    headers: this.generateRequestHeader(),
                });
                return true;
            }
            catch (error) {
                console.error('[BLINDERAI] Error sending data to API:', error);
            }
            return false;
        });
    }
}
exports.Handler = Handler;
//# sourceMappingURL=handler.js.map