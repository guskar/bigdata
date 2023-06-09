/**
 * Module for the HomeService.
 *
 * @author Gustav Karlberg
 * @version 1.0.0
 */

import { ElasticSearchClient } from '../clients/elasticClient.js'

/**
 * Encapsulates a HomeService.
 */
export class HomeService {
  /**
   * The service.
   *
   * @type {ElasticSearchClient}
   */
  #client
  /**
   * Initializes a new instance.
   *
   * @param {ElasticSearchClient} client - A service instantiated from a class with the same capabilities as ElasticSearchClient.
   */
  constructor (client = new ElasticSearchClient()) {
    this.#client = client
  }

  /**
   * Gets elastic data.
   *
   * @returns {object} - object representing elastic data.
   */
  async getData () {
    const response = await this.#client.search({
      index: 'gamesindex',
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  title: 'Final Fantasy'
                }
              },
              {
                range: {
                  rating: {
                    gte: 3.0
                  }
                }
              }
            ]
          }
        }
      }
    })

    const hits = response.body.hits.hits

    const data = hits.map(hit => ({
      name: hit._source.title,
      y: hit._source.rating
    }))

    return data
  }
}
