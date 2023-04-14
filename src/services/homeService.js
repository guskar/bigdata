/**
 * Module for the Home Service.
 *
 * @author Gustav Karlberg
 * @version 1.0.0
 */

import { Client } from '@elastic/elasticsearch'
import fs from 'fs'
/**
 * Encapsulates a Home service.
 */
export class HomeService {
  /**
   * Initializes a new instance.
   *
   */
  // constructor (repository = new UsersRepository()) {
  //   super(repository)
  // }

  /**
   * Gets elastic data.
   *
   * @returns {object} - object representing elastic data.
   */
  async getData () {
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

    return data
  }
}
