/**
 * THE ONLY FILE THAT CHANGES BETWEEN SITES.
 *
 * Everything else in this repository reads from here: page copy, meta titles,
 * schema, internal links, the phone number, the colours. To launch a new market,
 * copy this repo, edit this file, replace the content in src/content/, deploy.
 */

export const site = {
  business: {
    name:      'Bowling Green Tree Removal',
    shortName: 'BG Tree Removal',
    phone:     '(270) 721-7671',
    phoneRaw:  '+12707217671',
    email:     'info@bgtreeremoval.com',
    domain:    'bgtreeremoval.com',
  },

  location: {
    city:      'Bowling Green',
    state:     'Kentucky',
    stateAbbr: 'KY',
    zip:       '42101',
    county:    'Warren County',
    lat:        36.9685,
    lng:       -86.4808,
    radiusMi:   40,
  },

  trade: {
    noun:       'tree removal',
    nounPlural: 'tree services',
    // schema.org has no TreeRemovalService type; HomeAndConstructionBusiness is
    // the correct parent for this trade.
    schemaType: 'HomeAndConstructionBusiness',
  },

  brand: {
    primary:   '#14532d',
    primaryDk: '#0b3a1f',
    accent:    '#f59e0b',
    ink:       '#111827',
    body:      '#374151',
    surface:   '#f8faf8',
    logo:      '/images/logo.png',
  },

  legal: {
    disclosure:
      'Requests submitted through this website are shared with local, licensed and insured tree service providers, who will contact you directly using the details you provide.',
  },

  /** Root-level service pages, in nav order. */
  services: [
    { slug: 'tree-removal',           name: 'Tree Removal' },
    { slug: 'emergency-tree-removal', name: 'Emergency Tree Removal' },
    { slug: 'tree-pruning',           name: 'Tree Trimming' },
    { slug: 'stump-grinding',         name: 'Tree Stump Removal' },
    { slug: 'storm-cleanup',          name: 'Storm Cleanup' },
    { slug: 'commercial-clearing',    name: 'Commercial Tree Removal' },
  ],

  /** Towns served. Slug pattern must stay `tree-removal-<town>-ky`. */
  towns: [
    { slug: 'tree-removal-oakland-ky',       name: 'Oakland' },
    { slug: 'tree-removal-smiths-grove-ky',  name: 'Smiths Grove' },
    { slug: 'tree-removal-alvaton-ky',       name: 'Alvaton' },
    { slug: 'tree-removal-rockfield-ky',     name: 'Rockfield' },
    { slug: 'tree-removal-richardsville-ky', name: 'Richardsville' },
    { slug: 'tree-removal-plum-springs-ky',  name: 'Plum Springs' },
    { slug: 'tree-removal-woodburn-ky',      name: 'Woodburn' },
    { slug: 'tree-removal-bristow-ky',       name: 'Bristow' },
    { slug: 'tree-removal-scottsville-ky',   name: 'Scottsville' },
    { slug: 'tree-removal-franklin-ky',      name: 'Franklin' },
    { slug: 'tree-removal-russellville-ky',  name: 'Russellville' },
    { slug: 'tree-removal-glasgow-ky',       name: 'Glasgow' },
  ],

  /** Standalone pages that are not services, towns or FAQs. */
  staticPages: [
    { slug: 'services',                  name: 'Services' },
    { slug: 'service-area',              name: 'Service Area' },
    { slug: 'about',                     name: 'About' },
    { slug: 'contact',                   name: 'Contact' },
    { slug: 'privacy-policy',            name: 'Privacy Policy' },
    { slug: 'sms-terms-and-conditions',  name: 'SMS Terms and Conditions' },
  ],

  nav: [
    { href: '/',             label: 'Home' },
    { href: '/services/',    label: 'Services' },
    { href: '/service-area/', label: 'Service Area' },
    { href: '/faq/',         label: 'FAQ' },
    { href: '/about/',       label: 'About' },
    { href: '/contact/',     label: 'Contact' },
  ],
} as const;

export type Site = typeof site;
export default site;
