import { metric } from '../text-formatters.js'
import { BaseThunderstoreService, documentation } from './thunderstore-base.js'

export default class ThunderstoreLikes extends BaseThunderstoreService {
  static category = 'social'

  static route = {
    base: 'thunderstore/likes',
    pattern: ':namespace/:packageName',
  }

  static examples = [
    {
      title: 'Thunderstore Likes',
      namedParams: {
        namespace: 'notnotnotswipez',
        packageName: 'MoreCompany',
      },
      staticPreview: {
        label: 'likes',
        message: '150',
        style: 'social',
      },
      documentation,
    },
  ]

  static defaultBadgeData = {
    label: 'likes',
    namedLogo: 'thunderstore',
  }

  static render({ likes }) {
    return {
      message: metric(likes),
      color: `#${this.thunderstoreGreen}`,
    }
  }

  /**
   * @param {object} pkg - Package specifier
   * @param {string} pkg.namespace - the package namespace
   * @param {string} pkg.packageName - the package name
   * @returns {Promise<object>} - Promise containing the rendered badge payload
   */
  async handle({ namespace, packageName }) {
    const { rating_score: likes } = await this.fetchPackageMetrics({
      namespace,
      packageName,
    })
    return this.constructor.render({ likes })
  }
}
