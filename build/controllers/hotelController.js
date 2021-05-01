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
            const hoteles = yield database_1.default.query('SELECT *FROM hoteles  INNER JOIN categorias ON hoteles.IDCategoria =categorias.id_categoria;');
            res.json(hoteles);
        });
    }
    getone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const hoteles = yield database_1.default.query('SELECT *FROM hoteles  INNER JOIN categorias ON hoteles.IDCategoria =categorias.id_categoria WHERE hoteles.id_hotel= ?', [id]);
            if (hoteles.legth > 0) {
                return res.json(hoteles[0]);
            }
            res.status(404).json(hoteles);
        });
    }
    calificacionSelect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const calificaciones = yield database_1.default.query('SELECT *FROM calificacion WHERE IDHotel= ?', [id]);
            if (calificaciones.legth > 0) {
                return res.json(calificaciones[0]);
            }
            res.status(404).json(calificaciones);
        });
    }
    fotoSelect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const fotos = yield database_1.default.query('SELECT *FROM foto WHERE hotel_id= ?', [id]);
            if (fotos.legth > 0) {
                return res.json(fotos[0]);
            }
            res.status(404).json(fotos);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO hoteles(HotelName,Precio) VALUES ('${req.body.HotelName}',${req.body.Precio})`);
            res.json('create');
            // 
        });
    }
    filtrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filtro, tipo } = req.query;
            const hoteles = yield database_1.default.query('SELECT *FROM hoteles   INNER JOIN foto ON hoteles.id_hotel =foto.hotel_id INNER JOIN categorias ON hoteles.IDCategoria =categorias.id_categoria ORDER BY ? ?', [filtro, tipo]);
            if (hoteles.legth > 0) {
                return res.json(hoteles[0]);
            }
            res.status(404).json(hoteles);
        });
    }
    calificacionInsert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO calificacion (puntaje,comentarios) VALUES ('${req.body.puntaje}','${req.body.comentarios}') `);
            res.json('calificacion');
        });
    }
    fotoInsert(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO foto (Url) VALUES ('${req.body.Url}')`);
            res.json('foto');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM hoteles WHERE id_hotel= ?', [id]);
            yield database_1.default.query('DELETE FROM foto WHERE hotel_id= ?', [id]);
            yield database_1.default.query('DELETE FROM calificacion WHERE IDHotel= ?', [id]);
            res.json('delete');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE hoteles set ? WHERE id_hotel= ?', [id]);
            yield database_1.default.query('UPDATE foto set ? WHERE id_foto= ?', [id]);
            res.json('update');
        });
    }
}
exports.hotelController = new HotelController();
