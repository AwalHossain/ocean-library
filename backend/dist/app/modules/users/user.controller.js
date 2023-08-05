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
exports.UserController = void 0;
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    console.log(userData, 'userData');
    const result = yield user_service_1.UserService.createUser(userData);
    // const { refreshToken, ...others } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    console.log(userData, 'userData');
    const result = yield user_service_1.UserService.loginUser(userData);
    // const { others } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: result,
    });
}));
const wishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.body;
    const user = req.user;
    console.log(bookId, 'bookId wishlisht');
    const result = yield user_service_1.UserService.wishlist(user, bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Added to wishlist !',
        data: result,
    });
}));
const getWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.UserService.getWishList(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Gett the wishlist !',
        data: result,
    });
}));
const removeFromWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { bookId } = req.params;
    console.log(bookId, 'bookis');
    const result = yield user_service_1.UserService.removeFromWishlist(user, bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Remove from the Wishlist !',
        data: result,
    });
}));
const readingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.body;
    const user = req.user;
    const result = yield user_service_1.UserService.readingList(user, bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Added to Readinglist !',
        data: result,
    });
}));
const getReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.UserService.getReadingList(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'get the Readin list !',
        data: result,
    });
}));
const removeFromReadingList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { bookId } = req.params;
    console.log(bookId, 'from readinglist');
    const result = yield user_service_1.UserService.removeFromReadingList(user, bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Remove from the Readinglist !',
        data: result,
    });
}));
const finishedBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.body;
    const user = req.user;
    console.log(bookId, 'bookId finished book');
    const result = yield user_service_1.UserService.finishedBooks(user, bookId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Added to wishlist !',
        data: result,
    });
}));
const getFinishedBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.UserService.getFinishedBooks(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Added to wishlist !',
        data: result,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield user_service_1.UserService.refreshToken(refreshToken);
    // set refresh token into cookie
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: result,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User profile !',
        data: user,
    });
}));
exports.UserController = {
    createUser,
    loginUser,
    refreshToken,
    getMe,
    wishlist,
    readingList,
    finishedBooks,
    getFinishedBooks,
    getWishList,
    getReadingList,
    removeFromReadingList,
    removeFromWishlist,
};
