import express from 'express'

export interface IController {
    path: string
    router: express.Router
}