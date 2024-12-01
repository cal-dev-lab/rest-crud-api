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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const mongodb_1 = require("mongodb");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to cal-dev-lab\'s REST API 🚀',
    });
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json({
        message: 'List of all users.',
        data: users,
    });
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const userId = new mongodb_1.ObjectId();
    const user = yield prisma.user.create({
        data: {
            id: userId.toHexString(),
            name: name,
            email: email
        }
    });
    res.json({
        message: 'User created successfully.',
        data: user,
    });
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server active: http://localhost:${PORT}`);
});
// TODO:
/**
 * Add user roles
 * Add middleware
 * Add validation
 */
