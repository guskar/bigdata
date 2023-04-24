/**
 * Module for the HomeController.
 *
 * @author Gustav Karlberg
 * @version 1.0.0
 */

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
   * Gets data from elastic and sends it to the view.
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
