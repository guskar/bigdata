import { Client } from '@elastic/elasticsearch'
import fs from 'fs'

/**
 * Elasticsearch client class.
 */
export class ElasticSearchClient {
  /**
   * Constructor that sets up config for client.
   */
  constructor () {
    this.client = new Client({
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
