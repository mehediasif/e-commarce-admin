import mongoose from "mongoose";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET') {
        if(req.query?.id){
            res.json(await Product.findOne({_id:req.query.id}));
        }else{
            res.json(await Product.find());
        }
    };

    if (method === 'POST') {
        const {title,description,price,productImages,category} = req.body;
        const productDoc = await Product.create({
            title,description,price,category,productImages,
        })
        res.json(productDoc);
    }

    if (method === 'PUT') {
        const {title,description,price,_id,productImages,category} = req.body;
        await Product.updateOne({_id:_id}, {title:title,description:description,price:price,productImages:productImages,category:category});
        res.json(true);
    }

    if (method === 'DELETE'){
        if(req.query?.id){
            await Product.deleteOne({_id:req.query.id});
            res.json(true);
        }
    }
  }