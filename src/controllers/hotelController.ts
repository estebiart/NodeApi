import { request, Request,Response} from 'express';
import pool from '../database';
class HotelController{

    public  async index(req:Request,res:Response):Promise<void>{
       const hoteles= await pool.query('SELECT *FROM hoteles   INNER JOIN foto ON hoteles.id_hotel =foto.hotel_id INNER JOIN calificacion ON hoteles.id_hotel =calificacion.IDHotel INNER JOIN categorias ON hoteles.IDCategoria =categorias.id_categoria;');
        res.json(hoteles);
    } 
    public async getone(req:Request,res:Response):Promise<any>{
        const {id} =req.params;
        const hoteles= await pool.query('SELECT *FROM hoteles   INNER JOIN foto ON hoteles.id_hotel =foto.hotel_id INNER JOIN calificacion ON hoteles.id_hotel =calificacion.IDHotel INNER JOIN categorias ON hoteles.IDCategoria =categorias.id_categoria WHERE hoteles.id_hotel= ?', [id]);
       if(hoteles.legth >0){
           return res.json(hoteles[0]);
       }
        res.status(404).json(hoteles);
   
    } 
    public async create(req:Request,res:Response):Promise<void>{
        await pool.query('INSERT INTO hoteles set ?', [req.body]);
        await pool.query('INSERT INTO foto set ?', [req.body]);
         res.json('create');
    }
    public async filtrar(req:Request,res:Response):Promise<any>{
        const {filtro,tipo} =req.query;
        const hoteles= await pool.query('SELECT *FROM hoteles   INNER JOIN foto ON hoteles.id_hotel =foto.hotel_id INNER JOIN calificacion ON hoteles.id_hotel =calificacion.IDHotel INNER JOIN categorias ON hoteles.IDCategoria =categorias.id_categoria ORDER BY ? ?', [filtro,tipo]);
       if(hoteles.legth >0){
           return res.json(hoteles[0]);
       }
        res.status(404).json(hoteles);
   
    } 
    public async calificacion(req:Request,res:Response):Promise<void>{
        await pool.query('INSERT INTO calificacion set ?', [req.body]);
         res.json('calificacion');
    }
    public async delete(req:Request,res:Response):Promise<void>{
        const {id} =req.params;
        await pool.query('DELETE FROM hoteles WHERE id_hotel= ?', [id]);
        await pool.query('DELETE FROM foto WHERE hotel_id= ?', [id]);
        await pool.query('DELETE FROM calificacion WHERE IDHotel= ?', [id]);
        res.json('delete');
   }
   public async update(req:Request,res:Response):Promise<void>{
    const {id} =req.params;
        await pool.query('UPDATE hoteles set ? WHERE id_hotel= ?', [id]);
        await pool.query('UPDATE foto set ? WHERE id_foto= ?', [id]);
        res.json('update')
}
}

export const hotelController =new HotelController();