"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = require("../Models");
const bcrypt = __importStar(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const userData = {
    name: 'Layla',
    email: 'layla@gmail.com',
    password: 'ILoveBean',
    _id: ''
};
let userID;
function saveMockUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt.hash(userData.password, 10);
        const user = yield Models_1.userModel.create(Object.assign({}, userData, { password: hashedPassword, _id: new mongoose_1.default.Types.ObjectId() }));
        userID = user._id;
        return;
    });
}
exports.saveMockUser = saveMockUser;
function saveMockRecipes() {
    return __awaiter(this, void 0, void 0, function* () {
        const mockRecipes = [
            {
                author: "Layla",
                authorId: userID,
                name: "Black Bean Enchiladas",
                ingredients: [
                    {
                        quantity: "1 can",
                        name: "black beans"
                    },
                    {
                        quantity: "10",
                        name: "tortillas"
                    }
                ]
            },
            {
                author: "Layla",
                authorId: userID,
                name: "Baked Falafel Wraps",
                ingredients: [
                    {
                        quantity: "2 cups",
                        name: "dry chickpeas"
                    },
                    {
                        quantity: "1",
                        name: "yellow onion"
                    }
                ]
            }
        ];
        mockRecipes.forEach((recipe) => __awaiter(this, void 0, void 0, function* () {
            const createdRecipe = new Models_1.recipeModel(recipe);
            yield createdRecipe.save();
        }));
        return;
    });
}
exports.saveMockRecipes = saveMockRecipes;
//# sourceMappingURL=createSeedData.js.map