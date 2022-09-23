const express = require("express")
const router = express.Router()
const knex = require("../database")

router.get("/", async (request, response) => {
  try {
    let query = knex("concerts")

    if ("maxPrice" in request.query && typeof request.query.maxPrice === "string") {
      query = query.where("price", "<=", request.query.maxPrice)
    }

    if ("title" in request.query && typeof request.query.title === "string") {
      query = query.whereRaw("title LIKE ?", [`%${request.query.title}%`])
    }

    if ("createdAfter" in request.query && typeof request.query.createdAfter === "string") {
      query = query.where("created_date", ">", new Date(request.query.createdAfter).toISOString())
    }

    if ("band" in request.query && typeof request.query.band === "string") {
      query = query.where({ band: request.query.band })
    }

    console.log({ sql: query.toSQL().sql })

    const concerts = await query
    response.json(concerts)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: "Unexpected error" })
  }
})

router.get("/:id", async (request, response) => {
  const id = request.params.id

  try {
    const concerts = await knex("concerts").where({ id })
    if (concerts.length > 0) {
      response.json(concerts[0])
    } else {
      response.status(404).json({ error: "Not found" })
    }
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: "Unexpected error" })
  }
})

router.post("/", async (request, response) => {
  try {
    const newConcert = {
      title: request.body.title,
      band: request.body.band,
      venue: request.body.venue,
      performance_date: request.body.performance_date,
      price: request.body.price,
    }
    const [newConcertId] = await knex("concerts").insert(newConcert)
    response.status(201).json({ id: newConcertId, ...newConcert })
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: "Unexpected error" })
  }
})

router.put("/:id", async (request, response) => {
  const id = request.params.id

  try {
    const concerts = await knex("concerts").where({ id })
    if (concerts.length === 0) {
      return response.status(404).json({ error: "Not found" })
    }

    const updateConcert = {
      title: request.body.title,
      band: request.body.band,
      venue: request.body.venue,
      performance_date: request.body.performance_date,
      price: request.body.price,
    }
    await knex("concerts").where({ id }).update(updateConcert)
    response.json({ id, ...updateConcert })
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: "Unexpected error" })
  }
})

router.delete("/:id", async (request, response) => {
  const id = request.params.id

  try {
    const concerts = await knex("concerts").where({ id })
    if (concerts.length === 0) {
      return response.status(404).json({ error: "Not found" })
    }

    await knex("concerts").where({ id }).del()
    response.json({ id, message: "Deleted concert" })
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: "Unexpected error" })
  }
})

module.exports = router
