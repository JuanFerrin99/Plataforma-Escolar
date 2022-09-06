const { response } = require("../../app");
const app = require("../../app");
const request = require("supertest")(app);
const Pelicula = require("../DB/peliculaSchema.js");
const { connectTestDB, disconnectTestDB } = require("../utils/testUtils");
const { peliculaEj1, peliculaEj2, peliculaIncorrecta } = require("./fixtures/peliculasFixture");
const { token } = require("../utils/token.js");


beforeAll(async () => { 
    await connectTestDB("peliculas") 
})

/*-----------------------------------------------------------Crear pelicula test-------------------------------------------------------------*/
describe("Movie creation", () =>{
    describe("Suplied with the correct parameters",()=>{
        test("It should return with code 201", async () => {
            
            const response = await request.post("/peliculas").set('Authorization', `Bearer ${token}`).send(peliculaEj1)
            const pelicula = await Pelicula.findOne({_id: response.body._id}).lean();

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("_id","nombre","añoDeEstreno","directores","elenco","comentarios")
            expect(response.body).toMatchObject(peliculaEj1)
            expect(pelicula).toMatchObject(peliculaEj1)
        })
    })
    describe("Suplied with the wrong parameters",()=>{
        test("It should return code 400 if it receives a year prior to 1878", async () => {

            const response = await request.post("/peliculas").set('Authorization', `Bearer ${token}`).send(peliculaIncorrecta)

            const expectedError = {
                msg: 'La fecha de estreno debe ser superior a 1878', 
                param: 'añoDeEstreno', 
                location: 'body',
                value: 100
            }
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual([expectedError])
        })  
    })

    afterEach(async () => {
        await Pelicula.deleteMany({});
    })
})

/*--------------------------------------------------------Obtener peliculas test-------------------------------------------------------------*/
describe("Get all movies", () => {

    beforeAll(async () => {
        await Pelicula.create([peliculaEj1, peliculaEj2])
    })

    test("It should return with code 200", async () => {
        const response = await request.get("/peliculas").set('Authorization', `Bearer ${token}`).query({"nombre" : ""})

        const usersToExpect = [
            expect.objectContaining(peliculaEj1),
            expect.objectContaining(peliculaEj2),
        ];

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(expect.arrayContaining(usersToExpect))
    })

    afterAll(async () => {
        await Pelicula.deleteMany({})
    })
})

/*-----------------------------------------------------------Borrar pelicula test-------------------------------------------------------------*/
describe("Delete movie", () =>{

    beforeEach(async () => {
        await Pelicula.create(peliculaEj1)
    })

    describe("Successful case",()=>{
        test("It should return with code 200", async () => {

            const response = await request.delete(`/peliculas/${peliculaEj1._id}`).set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(200);
            expect(response.text).toBe("\"10\"")
        })
    })

    describe("Not successful case",()=>{
        test("It should return error 404 when it doesnt find the movie to delete it", async () => {

            const response = await request.delete("/peliculas/999").set('Authorization', `Bearer ${token}`)// le pasamos una pelicula no existente

            expect(response.statusCode).toBe(404);
            expect(response.text).toBe("{\"error\":\"No se encontro la pelicula\"}")
        })
    })

    afterEach(async () => {
        await Pelicula.deleteMany({})
    })
})

/*-----------------------------------------------------------Obtener pelicula test-------------------------------------------------------------*/
describe("Get movie", () => {

    beforeAll(async () => {
        await Pelicula.create(peliculaEj1)
    })

    test("It should return with code 200", async () => {
        const response = await request.get(`/peliculas/${peliculaEj1._id}`).set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(peliculaEj1)
    })

    test("It should return error 404 when it doesnt find the movie", async () => {
        const response = await request.get("/peliculas/999").set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("{\"error\":\"No se encontro la pelicula\"}")
    })
    
    afterAll(async () => {
        await Pelicula.deleteMany({})
    })
})

afterAll(async () => {
    await disconnectTestDB()
})