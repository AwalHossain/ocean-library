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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = require("./user.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExist(user.email);
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User already exist');
    }
    const result = yield user_model_1.User.create(user);
    //create access token & refresh token
    const { email, role } = result;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const loginUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.isUserExist(user.email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatch(user.password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Password does not match');
    }
    //create access token & refresh token
    const { email, role } = isUserExist;
    console.log(isUserExist, 'isUserExist');
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const wishlist = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // want to push the product id in the wishlist
    var _a;
    const existingUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    (_a = existingUser.wishlist) === null || _a === void 0 ? void 0 : _a.push(bookId);
    yield existingUser.save();
});
const getWishList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    //get the wishlist product
    const existingUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email }).populate('wishlist');
    return existingUser;
});
const removeFromWishlist = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // want to remove the product id in the wishlist
    var _b;
    const existingUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    const bookObjectId = new mongoose_1.Types.ObjectId(bookId);
    existingUser.wishlist = (_b = existingUser.wishlist) === null || _b === void 0 ? void 0 : _b.filter((id) => !new mongoose_1.Types.ObjectId(id).equals(bookObjectId));
    yield existingUser.save();
});
const readingList = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // want to push the product id in the reading list
    var _c;
    const existingUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    console.log(bookId, 'adding to readingList');
    (_c = existingUser.readingList) === null || _c === void 0 ? void 0 : _c.push((bookId));
    yield existingUser.save();
});
const getReadingList = (user) => __awaiter(void 0, void 0, void 0, function* () {
    //get the reading list product
    const existingUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email }).populate('readingList');
    return existingUser;
});
const removeFromReadingList = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // want to remove the product id in the wishlist
    var _d;
    const existingUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    const bookObjectId = new mongoose_1.Types.ObjectId(bookId);
    existingUser.readingList = (_d = existingUser.readingList) === null || _d === void 0 ? void 0 : _d.filter((id) => !new mongoose_1.Types.ObjectId(id).equals(bookObjectId));
    yield existingUser.save();
});
const finishedBooks = (user, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    // want to push the product id in the reading list
    var _e;
    const existingUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist');
    }
    (_e = existingUser.finishedBooks) === null || _e === void 0 ? void 0 : _e.push((bookId));
    yield existingUser.save();
});
const getFinishedBooks = (user) => __awaiter(void 0, void 0, void 0, function* () {
    //get the reading list product
    const existingUser = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email }).populate('finishedBooks');
    return existingUser;
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { email } = verifiedToken;
    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        email: isUserExist.email,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.UserService = {
    createUser,
    loginUser,
    refreshToken,
    wishlist,
    readingList,
    finishedBooks,
    getFinishedBooks,
    getWishList,
    getReadingList,
    removeFromReadingList,
    removeFromWishlist,
};
