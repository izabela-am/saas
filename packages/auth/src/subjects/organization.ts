import { z } from 'zod'

export const organizationSubject = z.tuple([
	z.union([z.literal('manage'), z.literal('get'), z.literal('export')]),
	z.literal('Organization'),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
