import { Request, Response, NextFunction } from "express"
import prisma from "../services/prisma"

export const userController = {
  async index(req: Request, res: Response) {
    const { email, firstName, lastName } = req.query
    let users = await prisma.user.findMany({
      where: {
        email: {
          contains: email as string
        },
        firstName: {
          contains: firstName as string,
          mode: 'insensitive'
        },
        lastName: {
          contains: lastName as string,
          mode: 'insensitive'
        }
      }
    })
   
    return res.json(users)
  },
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
        include: {
          car: true
        }
      })

      return res.json(user)
    } catch (error) {
      console.log('=======error==========');
      next(error)
    }
  },
  async findUniq(req: Request, res: Response) {
    const paramId = req.params.id
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(paramId),
      },
      include: {
        car: true
      }
    })

    return res.json(user)
  },
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const paramId = req.params.id
      const { firstName, lastName } = req.body
      const user = await prisma.user.update({
        where: {
          id: parseInt(paramId)
        },
        data: {
          firstName: firstName,
          lastName: lastName,
        },
        include: {
          car: true
        }
      })

      return res.json(user)
    } catch (error) {
      console.log('=======error==========');
      next(error)
    }
  },
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const paramId = req.params.id
      const user = await prisma.user.delete({
        where: {
          id: parseInt(paramId)
        }
      })

      return res.json(user)
    } catch (error) {
      next(error)
    }
  }
}