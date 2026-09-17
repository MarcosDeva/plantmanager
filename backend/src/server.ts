
import express, { Response, Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import data from './service/server.json';

const app = express();
const port = 3000;

interface PlantsPage {
  page: number;
  limit: number;
} 

interface PlantsProps {
      id: string;
      name: string;
      about: string;
      water_tips: string;
      photo: string;
      environments: [string];
      frequency: {
        times: number;
        repeat_every: string;
      }
}


app.get('/plants_water_frequencies', (req, res) => {

  res.send(data.plants_water_frequencies);

});


app.get('/plants-environments', (req, res) => {
  res.send(data.plants_environments);
});


/**  Seleciona */
app.get('/plants/page/:page/limit/:limit', (req: Request<PlantsPage>, res) => {
  const { page, limit } = req.params;
  const obj = JSON.stringify(data.plants);
  const dataArray: PlantsProps[] = JSON.parse(obj);
  const registros = dataArray.length;
  const paginas = registros/limit;//2 paginas teste atual
 
  // page 1-1 = 0*limit = 0
  // page 2-1 = 1*limit = 5
  var limitStart = (page-1)*limit;
  var limitEnd = limit*page;

  const limiteData  = dataArray.slice(limitStart,limitEnd);
  res.json(limiteData);

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
