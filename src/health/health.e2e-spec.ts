import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AppModule } from "../app.module"
import * as supertest from "supertest"

describe("HealthController (e2e)", () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe("GET /health", () => {
    it("should return status 200", async () => {
      await supertest
        .agent(app.getHttpServer())
        .get("/health")
        .expect(200)
        .expect({
          status: "ok",
          info: {
            database: { status: "up" },
          },
          error: {},
          details: {
            database: { status: "up" },
          },
        })
    })
  })
})
