import { query, request, Request,Response} from 'express';
import pool from '../database';
class HotelController{

    public  async index(req:Request,res:Response):Promise<void>{
       const hoteles= await pool.query('SELECT *FROM hoteles  INNER JOIN categorias ON hoteles.IDCategoria =categorias.id_categoria;');
        res.json(hoteles);
    } 
    public async getone(req:Request,res:Response):Promise<any>{
        const {id} =req.params;
        const hoteles= await pool.query('SELECT *FROM hoteles  INNER JOIN categorias ON hoteles.IDCategoria =categorias.id_categoria WHERE hoteles.id_hotel= ?', [id]);
       if(hoteles.legth >0){
           return res.json(hoteles[0]);
       }
        res.status(404).json(hoteles);
   
    } 
    public  async calificacionSelect(req:Request,res:Response):Promise<any>{
        const {id} =req.params;
        const calificaciones= await pool.query('SELECT *FROM calificacion WHERE IDHotel= ?', [id]);  
        if(calificaciones.legth >0){
            return res.json(calificaciones[0]);
        }
         res.status(404).json(calificaciones);
     } 
     public  async fotoSelect(req:Request,res:Response):Promise<any>{
        const {id} =req.params;
        const fotos= await pool.query('SELECT *FROM foto WHERE hotel_id= ?', [id]);  
        if(fotos.legth >0){
            return res.json(fotos[0]);
        }
         res.status(404).json(fotos);
     } 
    public async create(req:Request,res:Response){
         await pool.query(`INSERT INTO hoteles(HotelName,Precio) VALUES ('${req.body.HotelName}',${req.body.Precio})`);
         res.json('create');
      // 
       
    }
    public async filtrar(req:Request,res:Response):Promise<any>{
        const {filtro,tipo} =req.query;
        const hoteles= await pool.query('SELECT *FROM hoteles   INNER JOIN foto ON hoteles.id_hotel =foto.hotel_id INNER JOIN categorias ON hoteles.IDCategoria =categorias.id_categoria ORDER BY ? ?', [filtro,tipo]);
       if(hoteles.legth >0){
           return res.json(hoteles[0]);
       }
        res.status(404).json(hoteles);
   
    } 
    public async calificacionInsert(req:Request,res:Response){
        await pool.query(`INSERT INTO calificacion (puntaje,comentarios) VALUES ('${req.body.puntaje}','${req.body.comentarios}') `);
         res.json('calificacion');
    }
    public async fotoInsert(req:Request,res:Response){
        await pool.query(`INSERT INTO foto (Url) VALUES ('${req.body.Url}')`);
         res.json('foto');
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