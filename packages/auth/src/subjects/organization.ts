import { z } from 'zod'

import { organizationSchema } from '../models/Organization'

export const organizationSubject = z.tuple([
	z.union([
		z.literal('manage'),
		z.literal('create'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('transfer_ownership'),
	]),
	z.union([z.literal('Organiaztion'), organizationSchema]),
])

export type OrganizationSubject = z.infer<typeof organizationSubject>
