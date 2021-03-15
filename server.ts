import { validate } from 'class-validator';
import express from 'express';
import path from 'path';

import { Request, Response } from 'express';

import { Between, createConnection, MoreThanOrEqual } from 'typeorm';
import { WeatherDay } from './enties/weather-day';

console.log('Conectando con BD')

createConnection().then(connection => {
    const weatherRepository = connection.getRepository(WeatherDay);
    console.log('Conexion con pg creada');
    console.log

    const app = express();
    app.use(express.json());

    // app.get('/*', function (req, res) {

    //     res.sendFile(path.join(__dirname + '/dist/game-universe/index.html'));
    // });


    app.get('/weather', async function (req: Request, res: Response) {
        const result = await weatherRepository.find({
            order: {
                city: "ASC",
            }
        });
        res.send(result);
    });


    app.post('/weather', async function (req: Request, res: Response) {
        const weather = await weatherRepository.create(req.body);
        const errors = await validate(weather);
        if (errors.length > 0) {
            console.log(errors)
            res.status(400).json({ status: 'error', message: errors[0]?.constraints || 'El objeto no esta bien formado' })
        } else {
            try {
                const results = await weatherRepository.save(weather);
                return res.send(results);
            } catch (error) {
                res.status(500).json({ status: 'error', message: error.message || 'Algo extraño paso...' })
            }
        }

    });

    app.get('/find', async function (req: Request, res: Response) {
        if (!req.query.city) {
            res.status(400).json({ status: 'error', message: 'queryparam "city" no es valido' });
            return
        }

        if (!req.query.date && new Date(req.query.date as string)) {
            res.status(400).json({ status: 'error', message: 'queryparam "date" no es valido' })
            return
        }

        const starDate = new Date(req.query.date as string);
        starDate.setDate(starDate.getDate() + -1);
        const endDate = new Date(req.query.date as string);
        endDate.setDate(endDate.getDate() + 6);

        try {
            const dates = await weatherRepository.find({
                where: {
                    date: Between(starDate, endDate),
                    city: req.query.city
                },
                order: {
                    date: "ASC",
                }
            });
            res.send(dates);

        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message || 'Algo extraño paso...' })
        }

    });

    app.get('/city', async function (req: Request, res: Response) {
        const result = await weatherRepository.createQueryBuilder()
            .select('city')
            .distinct(true)
            .getRawMany();

        res.send(result.map(x => x.city));
    });

    app.delete('/weather', async function (req: Request, res: Response) {
        const result = await weatherRepository.clear();
        res.send(result);
    });

    // Serve only the static files form the dist directory
    // app.use(favicon(__dirname + '/build/favicon.ico'));
    // the __dirname is the current directory from where the script is running
    app.use(express.static(__dirname));
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });

    // Start the app by listening on the default Heroku port
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Servidor corriendo en ${port}`);
    });

});