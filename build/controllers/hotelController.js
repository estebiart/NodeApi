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
exports.hotelController = void 0;
const database_1 = __importDefault(require("../database"));
class HotelController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const hoteles = yield database_1.default.query('SELECT *FROM hoteles');
            res.json(hoteles);
        });
    }
    getone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const hoteles = yield database_1.default.query('SELECT *FROM hoteles WHERE id= ?', [id]);
            if (hoteles.legth > 0) {
                return res.json(hoteles[0]);
            }
            res.status(404).json(hoteles);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const hoteles = yield database_1.default.query('INSERT INTO hoteles set ?', [req.body]);
            res.json('cretaet');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM hoteles WHERE id= ?', [id]);
            res.json('delete');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE hoteles set ? WHERE id= ?', [id]);
            res.json('update');
        });
    }
}
exports.hotelController = new HotelController();
