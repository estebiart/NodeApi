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
        this.router.get('/:tipo?filtro',hotelController.filtrar);
        this.router.post('/',hotelController.create);
        this.router.post('/calificacion',hotelController.calificacion);
        this.router.delete('/:id',hotelController.delete);
        this.router.put('/:id',hotelController.update);
      
    }

}

const hotelRoutes = new HotelRoutes();
export default hotelRoutes.router;
