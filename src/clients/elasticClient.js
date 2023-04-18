import { Client } from '@elastic/elasticsearch'

/**
 * Elasticsearch client class.
 */
export class ElasticSearchClient {
  /**
   * Constructor that sets up config for client.
   */
  constructor () {
    this.client = new Client({
      node: process.env.ELASTIC_URL
    })
  }

  /**
   * Returns the search function.
   *
   * @param {object} params - Object representing the search-params.
   * @returns {object} - Returns the search-funtion.
   */
  async search (params) {
    return this.client.search(params)
  }
}
