import {parse} from 'csv-parse';
import fs from 'fs';

const bbperpb= (weight: number, height: number)=> {
  return new Promise<number>(async (resolve, reject)=> {
    try {
      const results: string[][]= [];
      const headers: string[]= [];
      let pos= 0;
      let z_score: number= 0;

      fs.createReadStream(process.cwd() + '/data/bbperpb_formatted.csv')
      .pipe(parse())
      .on('data', (row)=> {
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
        const heightIndex= headers.indexOf('panjang badan');
        const min1Index= headers.indexOf('-1 SD');
        const medianIndex= headers.indexOf('Median');
        const plus1Index= headers.indexOf('+1 SD');
        const heights: number[]= [];
        const mins1: number[]= [];
        const plus1: number[]= [];
        const medians: number[]= [];
        let heightDataIndex= 0;
    
        results.forEach((v)=> {
          heights.push(parseFloat(v[heightIndex]));
          mins1.push(parseFloat(v[min1Index]));
          plus1.push(parseFloat(v[plus1Index]));
          medians.push(parseFloat(v[medianIndex]));
        });

        heightDataIndex= heights.indexOf(height);

        if (heightDataIndex==-1) {
          heightDataIndex= heights.length - 1;
        }
              
        if (weight == medians[heightDataIndex]) {
          z_score= (weight - medians[heightDataIndex]) / medians[heightDataIndex];
        } 
          
        else if (weight < medians[heightDataIndex]) {
          z_score= (weight - medians[heightDataIndex]) / (medians[heightDataIndex] - mins1[heightDataIndex]);
        }
      
        else if (weight > medians[heightDataIndex]) {
          z_score= (weight - medians[heightDataIndex]) / (plus1[heightDataIndex] - medians[heightDataIndex]);
        }
        
        return resolve(+z_score.toFixed(2));
      });
    } catch (error) {
      reject(error);
    }
  })
}

export default bbperpb;