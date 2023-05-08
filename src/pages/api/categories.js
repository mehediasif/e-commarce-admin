import { mongooseConnect } from "../../../lib/mongoose";
import { Category } from "../../../models/Category";


export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === 'GET') {
        res.json(await Category.find().populate('parent'));
    }

    if (method === 'POST') {
        const {name,parentCategoryName,propertyName} = req.body;
        const categoryDoc = await Category.create({
            name:name,
            parent:parentCategoryName || undefined,
            propertyName,
        });
        res.json(categoryDoc);
    }
    if (method === 'PUT') {
        const {name,parentCategoryName,propertyName,_id} = req.body;
        const categoryDoc = await Category.updateOne({_id},{
            name:name,
            parent:parentCategoryName || undefined,
            propertyName,
        });
        res.json(categoryDoc);
    }

    if (method === 'DELETE'){
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json("Okay");
    }
  }