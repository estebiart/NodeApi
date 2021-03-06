import { Router} from 'express';
import { hotelController} from '../controllers/hotelController';



class HotelRoutes{
    public router:Router = Router();
    
    constructor(){
        this.config();
    }

    config():void {
        this.router.get('/',hotelController.index);
        this.router.get('/:id',hotelController.getone);
        this.router.get('/:?filtro&tipo',hotelController.filtrar);
        this.router.post('/',hotelController.create);
        this.router.post('/calificacion/',hotelController.calificacionInsert);
        this.router.get('/calificacion/:id',hotelController.calificacionSelect);
        this.router.post('/fotos/',hotelController.fotoInsert);
        this.router.get('/fotos/:id',hotelController.fotoSelect);
        this.router.delete('/:id',hotelController.delete);
        this.router.put('/:id',hotelController.update);
      
    }

}

const hotelRoutes = new HotelRoutes();
export default hotelRoutes.router;
