const { response } = require("../../app");
const app = require("../../app");
const request = require("supertest")(app);
const Materia = require("../Components/materiaCRUD/materiaSchema");
const { connectTestDB, disconnectTestDB } = require("../utils/testUtils");
const { materia1, materia2, materiaError } = require("./fixtures/materiaFixture");

let token;
beforeAll(async () => {
    await connectTestDB("Testing")

    //hardcodear un login que funcione con las funciones actuales
})


/*-------------------------------------------------POST materia test-------------------------------------------------------------*/

describe("Materia creation", () => {
    describe("Suplied with the correct parameters", () => {
        test("It should return with code 201", async () => {

            const response = await request.post("/materias").set('Authorization', `Bearer ${token}`).send(materia1)
            const materia = await Materia.findOne({ _id: response.body._id }).lean();

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("_id", "nombre", "duracion", "correlativas", "final")
            expect(response.body).toMatchObject(materia1)
            expect(materia).toMatchObject(materia1)
        })
    })
    describe("Suplied with the wrong parameters", () => {
        test("It should return code 500 if it receives a int instead of a string", async () => {

            const response = await request.post("/materias").set('Authorization', `Bearer ${token}`).send(materiaError)

            const expectedError = {
                msg: 'Nombre debe ser un string',
                param: 'nombre',
                location: 'body',
                value: "Materia"
            }
            expect(response.statusCode).toBe(500);
            expect(response.body.message).toEqual([expectedError])
        })
    })

    afterEach(async () => {
        await Materia.deleteMany({});
    })
})

/*-----------------------------------------------------------DELETE materia test-------------------------------------------------------------*/
/*
describe("Delete movie", () => {

    beforeEach(async () => {
        await Pelicula.create(peliculaEj1)
    })

    describe("Successful case", () => {
        test("It should return with code 200", async () => {

            const response = await request.delete(`/peliculas/${peliculaEj1._id}`).set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(200);
            expect(response.text).toBe("\"10\"")
        })
    })

    describe("Not successful case", () => {
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
*/
/*-----------------------------------------------------------PATCH materia test-------------------------------------------------------------*/
/*
describe("Delete movie", () => {

    beforeEach(async () => {
        await Pelicula.create(peliculaEj1)
    })

    describe("Successful case", () => {
        test("It should return with code 200", async () => {

            const response = await request.delete(`/peliculas/${peliculaEj1._id}`).set('Authorization', `Bearer ${token}`)

            expect(response.statusCode).toBe(200);
            expect(response.text).toBe("\"10\"")
        })
    })

    describe("Not successful case", () => {
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
*/
/*-----------------------------------------------------------GET materia test-------------------------------------------------------------*/
/*
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
*/

afterAll(async () => {
    await disconnectTestDB()
})
