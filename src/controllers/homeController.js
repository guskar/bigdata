/**
 * Module for the HomeController.
 *
 * @author Gustav Karlberg
 * @version 1.0.0
 */

// import createError from 'http-errors'
import { HomeService } from '../services/homeService.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * The service.
   *
   * @type {HomeService}
   */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {HomeService} service - A service instantiated from a class with the same capabilities as HomeService.
   */
  constructor (service = new HomeService()) {
    this.#service = service
  }

  /**
   * Renders a diagram.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const data = await this.#service.getData()
      res.render('home/index', { data })
    } catch (error) {
      next(error)
    }
  }
}
