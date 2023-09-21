import bbperpbFormula from "@/formulas/bbperpb";
import bbperuFormula from "@/formulas/bbperu";
import pbperuFormula from "@/formulas/pbperu";
import nutritionNeedsFormula from "@/formulas/nutritionNeeds";
import nutritionNeedsPerServingFormula from "@/formulas/nutritionPerServing";
import { NextApiRequest, NextApiResponse } from "next";
import { bbpbStatusCheker, bbuStatusCheker, pbuStatusCheker } from "@/formulas/statusChecker";
import * as yup from 'yup';

export const validationDto= yup.object({
  age: yup.number().min(0).required(),
  weight: yup.number().positive().required(),
  height: yup.number().positive().required(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  if (req.method=='POST') {
    try {
      const {age, weight, height}= await validationDto.validate(req.body, {
        abortEarly: false,
      });   
    
      const bbu= await bbperuFormula(weight, age);
      const pb_tb_u= await pbperuFormula(height, age);
      const bb_pb= await bbperpbFormula(weight, height);
    
      const nutritionNeeds= nutritionNeedsFormula(age, weight);
      const nutritionNeedsPerServing= nutritionNeedsPerServingFormula(
        nutritionNeeds.energi,
        nutritionNeeds.protein,
        nutritionNeeds.lemak,
        nutritionNeeds.karbo
      );
    
      const bb_u_informations= bbuStatusCheker(bbu);
      const bb_pb_informations= bbpbStatusCheker(bb_pb);
      const pb_tb_u_informations= pbuStatusCheker(pb_tb_u);
    
      return res.json({
        bbu,
        pb_tb_u,
        bb_pb,
        nutritionNeeds,
        nutritionNeedsPerServing,
        bb_u_informations,
        bb_pb_informations,
        pb_tb_u_informations,
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          errors: error.errors,
        });
      }

      console.error(error);

      return res.status(500).json({
        error: 'Internal Server Error', 
      })
    }
  }
  
  return res.send('method not allowed');
}