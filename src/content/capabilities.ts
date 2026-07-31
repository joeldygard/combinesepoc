import type { CapabilityGroup } from './types'

/** Three groups, deliberately not a grid of small cards and not an icon wall. */
export const capabilityGroups: CapabilityGroup[] = [
  {
    id: 'understand',
    title: 'Understand the system',
    description:
      'Models and measurements are only useful when they reflect the behaviour of the system itself.',
    items: [
      'System modelling',
      'Simulation and digital twins',
      'System identification',
      'Sensor fusion',
      'Control engineering',
      'Test and validation',
    ],
  },
  {
    id: 'analysis',
    title: 'Build reliable analysis',
    description:
      'Data pipelines, models and checks are developed together so that outputs can be reproduced and inspected.',
    items: [
      'Data engineering',
      'Machine learning',
      'Computer vision',
      'Forecasting',
      'Optimization',
      'Data quality and traceability',
    ],
  },
  {
    id: 'operate',
    title: 'Put it into operation',
    description:
      'We connect the analysis to the systems, infrastructure and people that need to use it.',
    items: [
      'Embedded and edge deployment',
      'Cloud services and APIs',
      'Real-time integration',
      'Monitoring',
      'Dashboards and decision tools',
      'Production software',
    ],
  },
]
