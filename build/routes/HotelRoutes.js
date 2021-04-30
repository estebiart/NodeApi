"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelController_1 = require("../controllers/hotelController");
class HotelRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', hotelController_1.hotelController.index);
        this.router.get('/:id', hotelController_1.hotelController.getone);
        this.router.post('/', hotelController_1.hotelController.create);
        this.router.delete('/:id', hotelController_1.hotelController.delete);
        this.router.put('/:id', hotelController_1.hotelController.update);
    }
}
const hotelRoutes = new HotelRoutes();
exports.default = hotelRoutes.router;
