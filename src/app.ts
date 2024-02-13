import express, { Request, Response, Express } from 'express'
import theatreRouter from './theatre/routes.ts'
import movieRouter from './movie/routes.ts';
import screenRouter from './screen/routes.ts';
import showRouter from './show/routes.ts';

const app: Express = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.use('/theatres', theatreRouter);
app.use('/movies', movieRouter);
app.use('/screens', screenRouter);
app.use('/shows', showRouter);


    
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})