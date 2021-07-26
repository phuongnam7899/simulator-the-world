"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const path_1 = __importDefault(require("path"));
/* GET users listing. */
router.get('/', (req, res, next) => {
    console.log('path', path_1.default.join(__dirname, 'tslint.json'));
    res.download(path_1.default.join(__dirname, 'tslint.json'), 'tslint.ts', (err) => {
        if (err) {
            // Handle error, but keep in mind the response may be partially-sent
            // so check res.headersSent
            console.log(err.message);
        }
        else {
            // decrement a download credit, etc.
        }
    });
});
exports.default = router;
//# sourceMappingURL=users.js.map