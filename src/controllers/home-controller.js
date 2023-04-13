/**
 * Home controller.
 *
 * @author Gustav Karlberg
 * @version 1.0.0
 */
import { Client } from '@elastic/elasticsearch'
import fs from 'fs'

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    const client = new Client({
      node: 'https://localhost:9200',
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      },
      tls: {
        ca: fs.readFileSync('/Users/gustavkarlberg/elasticsearch-8.7.0/config/certs/http_ca.crt'),
        rejectUnauthorized: false
      }
    })

    const response = await client.search({
      index: 'gamesindex',
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  title: 'Final Fantasy VI'
                }
              },
              {
                range: {
                  rating: {
                    gte: 3.8
                  }
                }
              }
            ]
          }
        }
      }
    })

    const hits = response.hits.hits

    const data = hits.map(hit => ({
      name: hit._source.title,
      y: hit._source.rating
    }))

    res.render('home/index', { data })
  }
}
