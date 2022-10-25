const { response } = require("../../app");
const app = require("../../app");
const request = require("supertest")(app);
const Materia = require("../Components/materiaCRUD/materiaSchema");
const Admin = require("../Components/adminCRUD/adminSchema");
const { connectTestDB, disconnectTestDB } = require("../utils/testUtils");
const { materia1, materia2, materia2Modified, materiaError } = require("./fixtures/materiaFixture");
const res = require("express/lib/response");
let token

beforeAll(async () => {
    await connectTestDB("-Testing")

    const admin = {
        "nombre": "Julio",
        "apellido": "Patiño",
        "mail": "admin@gmail.com",
        "rol": "admin"
    }
    await Admin.create(admin)

    const response = await request.post("/login").send({ "email": "admin@gmail.com", "password": "123456789" })
    token = response._body.message

    await Admin.deleteMany({});
})


/*-------------------------------------------------POST materia test-------------------------------------------------------------*/

describe("Materia creation", () => {
    describe("Suplied with the correct parameters", () => {
        test("It should return with code 201", async () => {

            const response = await request.post("/materias").set('Cookie', `token=${token}`).send(materia1)
            const materia = await Materia.findOne({ nombre: response.body.nombre }).lean()

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty("nombre", "duracion", "correlativas", "final")
            expect(response.body).toMatchObject(materia1)
            expect(materia).toMatchObject(materia1)
        })
    })
    describe("Suplied with the wrong parameters", () => {
        test("It should return code 400 if it receives a int instead of a string", async () => {

            const response = await request.post("/materias").set('Cookie', `token=${token}`).send(materiaError)

            const expectedError = {
                location: 'body',
                msg: 'Nombre debe ser un string',
                param: 'nombre',
                value: "Materia",
                value: 15
            }
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toEqual([expectedError])
        })
    })

    afterEach(async () => {
        await Materia.deleteMany({});
    })
})

/*-----------------------------------------------------------DELETE materia test-------------------------------------------------------------*/

describe("Delete materia", () => {

    beforeEach(async () => {
        await Materia.create(materia2)
    })

    describe("Successful case", () => {
        test("It should return with code 200 and 404 for the get fetch", async () => {
            const responseDelete = await request.delete(`/materias/${materia2._id}`).set('Cookie', `token=${token}`)
            expect(responseDelete.statusCode).toBe(200)

            const responseGet = await request.get(`/materias/${materia2._id}`).set('Cookie', `token=${token}`)
            expect(responseGet.statusCode).toBe(404)
        })
    })

    describe("Not successful case", () => {
        test("It should return error 404 when it doesnt find the materia to delete it", async () => {

            const response = await request.delete("/materias/6335fa074fda6c2aa027fdb8").set('Cookie', `token=${token}`)

            expect(response.statusCode).toBe(404);
            expect(response.text).toBe("{\"error\":\"No se encontro la materia\"}")
        })
    })

    afterEach(async () => {
        await Materia.deleteMany({})
    })
})

/*-----------------------------------------------------------PATCH materia test-------------------------------------------------------------*/

describe("Patch materia", () => {

    beforeEach(async () => {
        await Materia.create(materia2)
    })

    describe("Successful case", () => {
        test("It should return with code 200", async () => {
            modificacion = {
                "duracion": "Anual"
            }

            const responsePatch = await request.patch(`/materias/${materia2._id}`).set('Cookie', `token=${token}`).send(modificacion)
            expect(responsePatch.statusCode).toBe(200)

            const responseGet = await request.get(`/materias/${materia2._id}`).set('Cookie', `token=${token}`)
            expect(responseGet.text).toBe("{\"_id\":\"6335eed14fda6c2aa027fdb6\",\"nombre\":\"Algebra\",\"duracion\":\"Anual\",\"correlativas\":[],\"final\":\"False\",\"__v\":0}")
        })
    })

    describe("Not successful case", () => {
        test("It should return error 404 when it doesnt find the materia to patch it", async () => {
            const response = await request.patch("/materias/6335fa074fda6c2aa027fdb8").set('Cookie', `token=${token}`)

            expect(response.statusCode).toBe(404);
            expect(response.text).toBe("{\"error\":\"No se encontro la materia\"}")
        })
    })

    afterEach(async () => {
        await Materia.deleteMany({})
    })
})

/*-----------------------------------------------------------GET materia test-------------------------------------------------------------*/

describe("Get materia", () => {
    beforeAll(async () => {
        await Materia.create(materia2)
    })

    test("It should return with code 200", async () => {
        const response = await request.get(`/materias/${materia2._id}`).set('Cookie', `token=${token}`)

        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(materia2)
    })

    test("It should return error 404 when it doesnt find the materia", async () => {
        const response = await request.get("/materias/6335fa074fda6c2aa027fdb8").set('Cookie', `token=${token}`)

        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("{\"error\":\"No se encontro la materia\"}")
    })

    afterAll(async () => {
        await Materia.deleteMany({})
    })
})

afterAll(async () => {
    await disconnectTestDB()
})
