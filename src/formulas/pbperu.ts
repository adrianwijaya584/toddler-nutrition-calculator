import {parse} from 'csv-parse';
import fs from 'fs';

const pbperu= (height: number, age: number)=> {
 return new Promise<number>(async (resolve, reject)=> {
    try {
      const results: string[][]= [];
      const headers: string[]= [];
      let pos= 0;
      let z_score: number= 0;

      fs.createReadStream('./src/data/pbtbperu.csv')
      .pipe(parse())
      .on('data', (row: string[])=> {
        if (!pos) {
          headers.push(...row);
        } else {
          results.push(row);
        }
    
        pos++;
      })
      .on('error', (error)=> {
        reject(error);
      })
      .on('close', ()=> {
        const ageIndex= headers.indexOf('umur bulan');
        const min1Index= headers.indexOf('-1 SD');
        const medianIndex= headers.indexOf('Median');
        const plus1Index= headers.indexOf('+1 SD');
        const ages: number[]= [];
        const mins1: number[]= [];
        const plus1: number[]= [];
        const medians: number[]= [];
      
        results.forEach((v)=> {
          ages.push(parseFloat(v[ageIndex]));
          mins1.push(parseFloat(v[min1Index]));
          plus1.push(parseFloat(v[plus1Index]));
          medians.push(parseFloat(v[medianIndex]));
        });
      
      
        if (height == medians[age]) {
          z_score= (height - medians[age]) / medians[age];
        } 
          
        else if (height < medians[age]) {
          z_score= (height - medians[age]) / (medians[age] - mins1[age]);
        }
      
        else if (height > medians[age]) {
          z_score= (height - medians[age]) / (plus1[age] - medians[age]);
        }

        return resolve(+z_score.toFixed(2));
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default pbperu;